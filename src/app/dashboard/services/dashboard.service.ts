import { getCurrentLearningPeriod } from 'ecap-lib/dist/utils';
import { In } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../auth/entities/user.entity';
import { RolesEnum } from '../../../auth/enums/roles.enum';
import {
  addInOrEqualsCondition,
  extractPaginationOptions,
  formInOrEqualsCondition,
  getAndDeleteField,
} from '../../../core';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
import { AcademicYearService } from '../../../domain/track/services/academic-year.service';
import { TrackLearningPeriodService } from '../../../domain/track/services/track-learning-period.service';
import {
  AcademyStatItemDto,
  DashboardStatsResponseDto,
} from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';

type LearningPeriodGroup = [
  {
    start_date: Date;
    end_date: Date;
  },
  TrackLearningPeriodEntity[],
];

type DashboardStatsWithGroups = DashboardStatsResponseDto & {
  groups: LearningPeriodGroup[];
  periodAverages: {
    percentage: number;
    start_date: string;
    end_date: string;
    academy_id: string;
    academy_name: string;
  }[];
};

@Injectable()
export class DashboardService {
  constructor(
    private trackLearningPeriodService: TrackLearningPeriodService,
    private academicYearService: AcademicYearService,
  ) {}

  async getDashboardStats(
    options: DashboardFilterDto,
    user: UserEntity,
  ): Promise<DashboardStatsResponseDto> {
    const teacherStats = await this.getTeacherStats(options);

    if (user.role === RolesEnum.TEACHER) {
      return this.clearStats(teacherStats);
    }

    const directorStats = await this.getDirectorStats(teacherStats);
    if (user.role === RolesEnum.DIRECTOR) {
      return this.clearStats(directorStats);
    }

    const adminStats = await this.getAdminStats(directorStats);

    return this.clearStats(adminStats);
  }

  async clearStats(stats: DashboardStatsWithGroups) {
    delete stats.groups;
    delete stats.periodAverages;
    return stats;
  }

  private async getTeacherStats(
    options: DashboardFilterDto,
  ): Promise<DashboardStatsWithGroups> {
    const filters = extractPaginationOptions(options).filters;
    const currentAcademicYears =
      await this.academicYearService.findCurrentAcademicYears();

    if (currentAcademicYears.length)
      filters.track = {
        ...filters.track,
        academic_year_id: In(
          currentAcademicYears.map((year) => year.id),
        ) as unknown as number,
      };

    const learningPeriods = await this.trackLearningPeriodService.findBy({
      where: { ...filters },
    });

    if (!learningPeriods.length) {
      return {
        academicYear: currentAcademicYears[0] || null,
        academies: [],
        groups: [],
        periodAverages: [],
        yearToDateCompliance: 0,
        currentLP: {
          learningPeriods: [],
          compliance: 0,
          completed: false,
        },
        previousLP: {
          learningPeriods: [],
          compliance: 0,
          completed: false,
        },
        beforeThePreviousOne: {
          learningPeriods: [],
          compliance: 0,
          completed: false,
        },
        upcomingLP: {
          learningPeriods: [],
          compliance: 0,
          completed: false,
        },
      };
    }

    const periodGroups = this.groupLearningPeriods(learningPeriods);
    const currentPeriodIndex = this.findCurrentPeriodIndex(periodGroups);

    const periodAverages = await this.calculatePeriodAverages(
      periodGroups
        .slice(
          0,
          currentPeriodIndex === -1
            ? periodGroups.length
            : currentPeriodIndex + 1,
        )
        .flatMap(([, periods]) => periods),
      options,
    );

    const periodStats = this.calculatePeriodStats(periodGroups, periodAverages);

    return {
      groups: periodGroups,
      periodAverages,
      academicYear: currentAcademicYears[0],
      ...periodStats,
    } as DashboardStatsWithGroups;
  }

  private async getDirectorStats(
    baseStats: DashboardStatsWithGroups,
  ): Promise<DashboardStatsWithGroups> {
    return {
      ...baseStats,
      yearToDateCompliance: this.calculateCompliance(
        baseStats.periodAverages,
        null,
        null,
        null,
      ),
    };
  }

  private async getAdminStats(
    baseStats: DashboardStatsWithGroups,
  ): Promise<DashboardStatsWithGroups> {
    const academies = this.calculateAcademyStats(baseStats);
    return {
      ...baseStats,
      academies,
    };
  }

  private findCurrentPeriodIndex(groups: LearningPeriodGroup[]): number {
    const currentPeriod = getCurrentLearningPeriod(
      groups.flatMap(([, periods]) => periods),
    );

    return groups.findIndex(([, periods]) =>
      periods.some((period) => period.id === currentPeriod?.id),
    );
  }

  private calculatePeriodStats(
    groups: LearningPeriodGroup[],
    averages: DashboardStatsWithGroups['periodAverages'],
  ) {
    const currentIndex = this.findCurrentPeriodIndex(groups);

    return [
      groups[currentIndex - 2],
      groups[currentIndex - 1],
      groups[currentIndex],
      groups[currentIndex + 1],
    ]
      .map((period) => this.createPeriodStats(period, averages))
      .reduce(
        (acc, stats, index) => ({
          ...acc,
          [['beforeThePreviousOne', 'previousLP', 'currentLP', 'upcomingLP'][
            index
          ]]: stats,
        }),
        {},
      );
  }

  private calculateAcademyStats(stats: DashboardStatsWithGroups) {
    const academies = stats.periodAverages
      .filter((avg) => avg.academy_id && !avg.start_date && !avg.end_date)
      .map((avg) => {
        const compliance = this.calculateCompliance(
          stats.periodAverages,
          this.formatDate(stats.currentLP.learningPeriods[0]?.start_date),
          this.formatDate(stats.currentLP.learningPeriods[0]?.end_date),
          avg.academy_id,
        );

        return {
          ...avg,
          compliance,
          yearToDateCompliance: Number(avg.percentage),
        };
      }) as AcademyStatItemDto[];

    return academies;
  }

  private createPeriodStats(
    period: LearningPeriodGroup | null,
    averages: DashboardStatsWithGroups['periodAverages'],
  ) {
    if (!period || !period[0]) {
      return {
        learningPeriods: [],
        compliance: 0,
        completed: false,
      };
    }

    const compliance =
      this.calculateCompliance(
        averages,
        this.formatDate(period[0].start_date),
        this.formatDate(period[0].end_date),
        null,
      ) || 0;

    return {
      learningPeriods: period[1] || [],
      compliance,
      completed: compliance >= 100,
    };
  }

  private calculateCompliance(
    averages: DashboardStatsWithGroups['periodAverages'],
    startDate: string,
    endDate: string,
    academyId: string,
  ) {
    const percentages = averages
      .filter(
        (avg) =>
          avg.start_date == startDate &&
          avg.end_date == endDate &&
          avg.academy_id == academyId,
      )
      .map(({ percentage }) => percentage)
      .filter((percentage) => percentage != null)
      .map((percentage) => Number(percentage));

    return (
      percentages.reduce((acc, curr) => acc + curr, 0) / percentages.length
    );
  }

  private groupLearningPeriods(
    periods: TrackLearningPeriodEntity[],
  ): LearningPeriodGroup[] {
    const groups = new Map<string, TrackLearningPeriodEntity[]>();

    periods.forEach((period) => {
      const key = this.createPeriodKey(period);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(period);
    });

    // sort from the most recent to the oldest
    return Array.from(groups.entries())
      .map(
        ([key, periods]) =>
          [
            {
              start_date: new Date(key.split(' ')[0]),
              end_date: new Date(key.split(' ')[1]),
            },
            periods,
          ] as LearningPeriodGroup,
      )
      .sort(
        ([key1], [key2]) =>
          key1.start_date.getTime() - key2.start_date.getTime() ||
          key1.end_date.getTime() - key2.end_date.getTime(),
      );
  }

  private async calculatePeriodAverages(
    periods: TrackLearningPeriodEntity[],
    filters: DashboardFilterDto,
  ): Promise<DashboardStatsWithGroups['periodAverages']> {
    const queryBuilder = this.trackLearningPeriodService
      .getRepository()
      .createQueryBuilder('track_learning_periods')
      .select(
        `
        avg(student_lp_enrollments.percentage) as percentage,
        track_learning_periods.start_date as start_date,
        track_learning_periods.end_date as end_date,
        student.academy_id as academy_id,
        academy.name as academy_name
        `,
      )
      .innerJoin('track_learning_periods.track', 'track')
      .innerJoin(
        'track_learning_periods.student_lp_enrollments',
        'student_lp_enrollments',
      )
      .innerJoin('student_lp_enrollments.student', 'student')
      .innerJoin('student.academy', 'academy')
      .where('track_learning_periods.id IN (:...track_learning_periods_id)', {
        track_learning_periods_id: periods.map((period) => period.id),
      });

    this.applyFilters(queryBuilder, filters);

    queryBuilder.groupBy(
      `GROUPING SETS 
      (
        (track_learning_periods.start_date, track_learning_periods.end_date, student.academy_id, academy.name), 
        (track_learning_periods.start_date, track_learning_periods.end_date), 
        (student.academy_id, academy.name), 
        ()
      )`,
    );

    return queryBuilder.getRawMany().then((results) =>
      results.map((result) => ({
        ...result,
        start_date: result.start_date
          ? this.formatDate(result.start_date)
          : null,
        end_date: result.end_date ? this.formatDate(result.end_date) : null,
      })),
    );
  }

  private applyFilters(queryBuilder: any, filters: DashboardFilterDto) {
    const admins = getAndDeleteField(filters, 'track.tenant.admins.id');
    const academy = getAndDeleteField(
      filters,
      'student_lp_enrollments.student.academy_id',
    );
    const teacher = getAndDeleteField(
      filters,
      'student_lp_enrollments.teacher_enrollments.teacher_id',
    );

    if (admins || admins === 0) {
      const [condition, params] = formInOrEqualsCondition(
        'admins.id',
        [admins],
        'admin_ids',
      );
      queryBuilder.innerJoin('track.tenant', 'tenant');
      queryBuilder.innerJoin('tenant.admins', 'admins', condition, params);
    }

    if (academy || academy === 0) {
      addInOrEqualsCondition(queryBuilder, 'student.academy_id', [academy]);
    }

    if (teacher || teacher === 0) {
      const [condition, params] = formInOrEqualsCondition(
        'teacher_enrollments.teacher_id',
        [teacher],
        'teacher_ids',
      );
      queryBuilder.innerJoin(
        'student_lp_enrollments.teacher_enrollments',
        'teacher_enrollments',
        condition,
        params,
      );
    }
  }

  private createPeriodKey(period: TrackLearningPeriodEntity): string {
    return `${this.formatDate(period.start_date)} ${this.formatDate(period.end_date)}`;
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

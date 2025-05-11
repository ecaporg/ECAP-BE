import { In } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { extractPaginationOptions } from '@/core';
import { AcademicYearService } from '@/track/services/academic-year.service';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';
import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';
import { UserEntity } from '@/users/entities/user.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

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
    const filters =
      extractPaginationOptions<DashboardFilterDto>(options).filters;
    const currentAcademicYears =
      await this.academicYearService.findCurrentAcademicYears();

    filters.track = {
      ...filters.track,
      academic_year_id: In(currentAcademicYears.map((year) => year.id)),
    };

    const now = new Date();
    const learningPeriods = await this.trackLearningPeriodService.findBy({
      where: { ...filters },
    });

    const periodGroups = this.groupLearningPeriods(learningPeriods);
    const currentPeriodIndex = this.findCurrentPeriodIndex(periodGroups, now);

    const periodAverages = await this.calculatePeriodAverages(
      periodGroups
        .slice(
          0,
          currentPeriodIndex === -1
            ? periodGroups.length
            : currentPeriodIndex + 1,
        )
        .flatMap(([, periods]) => periods),
      filters,
    );

    const periodStats = this.calculatePeriodStats(
      periodGroups,
      now,
      periodAverages,
    );

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

  private findCurrentPeriodIndex(
    groups: LearningPeriodGroup[],
    now: Date,
  ): number {
    return groups.findIndex(
      ([key]) => key.start_date <= now && key.end_date >= now,
    );
  }

  private calculatePeriodStats(
    groups: LearningPeriodGroup[],
    now: Date,
    averages: DashboardStatsWithGroups['periodAverages'],
  ) {
    const currentIndex = this.findCurrentPeriodIndex(groups, now);

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
          this.formatDate(stats.currentLP.learningPeriods[0].start_date),
          this.formatDate(stats.currentLP.learningPeriods[0].end_date),
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
    if (!period) {
      return {
        learningPeriods: [],
        compliance: 0,
        completed: false,
      };
    }

    const compliance = this.calculateCompliance(
      averages,
      this.formatDate(period[0].start_date),
      this.formatDate(period[0].end_date),
      null,
    );

    return {
      learningPeriods: period[1],
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
      .map(({ percentage }) => percentage);

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
        avg(assignment_periods.percentage) as percentage,
        track_learning_periods.start_date as start_date,
        track_learning_periods.end_date as end_date,
        student.academy_id as academy_id,
        academy.name as academy_name
        `,
      )
      .leftJoin('track_learning_periods.track', 'track')
      .leftJoin(
        'track_learning_periods.assignment_periods',
        'assignment_periods',
      )
      .leftJoin('assignment_periods.student', 'student')
      .leftJoin('student.academy', 'academy')
      .where('track_learning_periods.id IN (:...ids)', {
        ids: periods.map((period) => period.id),
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
    if (filters['track.tenant.admins.id']) {
      queryBuilder.andWhere('track.tenant.admins.id = :adminId', {
        adminId: filters['track.tenant.admins.id'],
      });
    }
    if (filters['assignment_periods.student.academy_id']) {
      queryBuilder.andWhere('student.academy_id = :academyId', {
        academyId: filters['assignment_periods.student.academy_id'],
      });
    }
    if (filters['assignment_periods.course.teacher_id']) {
      queryBuilder
        .leftJoin('assignment_periods.course', 'course')
        .andWhere('course.teacher_id = :teacherId', {
          teacherId: filters['assignment_periods.course.teacher_id'],
        });
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

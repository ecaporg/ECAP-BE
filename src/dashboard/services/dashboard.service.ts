import { In } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { extractPaginationOptions } from '@/core';
import { AcademicYearService } from '@/school/services/academic-year.service';
import { AssignmentPeriodService } from '@/school/services/assignment.service';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';
import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';
import { UserEntity } from '@/users/entities/user.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { DashboardStatsResponseDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';

type Groups = [
  {
    start_date: Date;
    end_date: Date;
  },
  TrackLearningPeriodEntity[],
];

type ResponseWithGroups = DashboardStatsResponseDto & {
  groups: Groups[];
};

@Injectable()
export class DashboardService {
  constructor(
    private trackLearningPeriodService: TrackLearningPeriodService,
    private academicYearService: AcademicYearService,
    private assignmentPeriodService: AssignmentPeriodService,
  ) {}

  async getDashboardStats(
    options: DashboardFilterDto,
    user: UserEntity,
  ): Promise<DashboardStatsResponseDto> {
    const baseStats = await this.getStatisticForTeacher(options);
    if (user.role === RolesEnum.TEACHER) {
      delete baseStats.groups;
      return baseStats;
    }

    const directorStats = await this.getStatisticForDirector(baseStats);
    if (user.role === RolesEnum.DIRECTOR) {
      delete directorStats.groups;
      return directorStats;
    }

    return directorStats;
  }

  private async getStatisticForTeacher(options: DashboardFilterDto) {
    const filters =
      extractPaginationOptions<DashboardFilterDto>(options).filters;

    const currentAcademicYears =
      await this.academicYearService.findCurrentAcademicYears();

    filters.track = {
      ...filters.track,
      academic_year_id: In(
        currentAcademicYears.map((academicYear) => academicYear.id),
      ),
    };

    const now = new Date();

    const allLP = await this.trackLearningPeriodService.findBy({
      where: {
        ...filters,
      },
    });

    const groups = this.formGroups(allLP);

    const currentLP =
      groups.find(
        ([key]) => key.start_date <= now && key.end_date >= now,
      )?.[1] || [];

    const upcomingLP = groups.find(([key]) => key.start_date > now)?.[1] || [];

    const previousLP = groups.find(([key]) => key.end_date < now)?.[1] || [];

    const beforeThePreviousOne =
      previousLP.length > 0
        ? groups.find(([key]) => key.end_date < previousLP[0].start_date)?.[1]
        : [];

    const [
      currentCompliance = 0,
      upcomingCompliance = 0,
      previousCompliance = 0,
      beforeThePreviousOneCompliance = 0,
    ] = await Promise.all([
      this.calculateCompliance(currentLP),
      this.calculateCompliance(upcomingLP),
      this.calculateCompliance(previousLP),
      this.calculateCompliance(beforeThePreviousOne),
    ]);

    return {
      groups,
      currentLP: {
        learningPeriods: currentLP,
        compliance: currentCompliance,
        completed: currentCompliance === 100,
      },
      upcomingLP: {
        learningPeriods: upcomingLP,
        compliance: upcomingCompliance,
        completed: upcomingCompliance === 100,
      },
      previousLP: {
        learningPeriods: previousLP,
        compliance: previousCompliance,
        completed: previousCompliance >= 100,
      },
      beforeThePreviousOne: {
        learningPeriods: beforeThePreviousOne,
        compliance: beforeThePreviousOneCompliance,
        completed: beforeThePreviousOneCompliance >= 100,
      },
      academicYear: currentAcademicYears[0],
    };
  }

  private async getStatisticForDirector(baseStats: ResponseWithGroups) {
    const now = new Date();
    const currentIndex = baseStats.groups.findIndex(
      ([key]) => key.start_date <= now && key.end_date >= now,
    );

    const yearToDateCompliance = await this.calculateCompliance(
      baseStats.groups
        .slice(
          0,
          currentIndex === -1 ? baseStats.groups.length : currentIndex + 1,
        )
        .flatMap(([, lp]) => lp),
    );

    return {
      ...baseStats,
      yearToDateCompliance,
    };
  }

  private calculateCompliance(lp: TrackLearningPeriodEntity[]) {
    return this.assignmentPeriodService.average('percentage', {
      learning_period_id: In(lp.map((lp) => lp.id)),
    });
  }

  private formatDateKey(lp: TrackLearningPeriodEntity) {
    return `${lp.start_date.toISOString().split('T')[0]} ${lp.end_date.toISOString().split('T')[0]}`;
  }

  private formGroups(allLP: TrackLearningPeriodEntity[]) {
    const groups = new Map();

    allLP.forEach((lp) => {
      const key = this.formatDateKey(lp);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(lp);
    });

    // sort from the most recent to the oldest
    return Array.from(groups.entries())
      .map(
        ([key, lp]) =>
          [
            {
              start_date: new Date(key.split(' ')[0]),
              end_date: new Date(key.split(' ')[1]),
            },
            lp,
          ] as Groups,
      )
      .sort(
        ([key1], [key2]) =>
          key2.start_date.getTime() - key1.start_date.getTime(),
      );
  }
}

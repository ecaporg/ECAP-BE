import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { CourseEntity } from '@/course/entities/course.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

@Entity('assignment_periods')
export class AssignmentPeriodEntity extends GenericEntity {
  @ApiProperty({
    description: 'Course ID associated with this period',
  })
  @Column()
  course_id: number;

  @ApiProperty({ description: 'Student ID associated with this period' })
  @Column()
  student_id: number;

  @ApiProperty({
    description: 'Learning period ID associated with this period',
  })
  @Column()
  learning_period_id: number;

  @ApiProperty({ description: 'Whether this period is completed' })
  @Column()
  completed: boolean;

  @ApiProperty({
    description: 'Learning period associated with this period',
    type: () => TrackLearningPeriodEntity,
  })
  @ManyToOne(() => TrackLearningPeriodEntity)
  @JoinColumn({ name: 'learning_period_id' })
  learning_period: TrackLearningPeriodEntity;

  @ApiProperty({
    description: 'Assignment associated with this period',
    type: () => Object,
  })
  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ApiProperty({
    description: 'Student associated with this period',
    type: () => StudentEntity,
  })
  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ApiProperty({
    description: 'Samples associated with this period',
    type: () => [{}],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.assignment_period)
  samples: SampleEntity[];
}

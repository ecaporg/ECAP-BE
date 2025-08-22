import { IsNumber } from 'class-validator';

export class SubmissionSummaryDto {
  @IsNumber()
  graded: number;

  @IsNumber()
  ungraded: number;

  @IsNumber()
  not_submitted: number;
}


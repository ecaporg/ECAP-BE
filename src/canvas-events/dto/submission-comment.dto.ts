import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { MediaCommentDto } from './media-comment.dto';

export class SubmissionCommentDto {
  @IsNumber()
  id: number;

  @IsNumber()
  author_id: number;

  @IsString()
  author_name: string;

  @IsOptional()
  author?: any;

  @IsString()
  comment: string;

  @IsString()
  created_at: string;

  @IsOptional()
  @IsString()
  edited_at?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MediaCommentDto)
  media_comment?: MediaCommentDto;
}

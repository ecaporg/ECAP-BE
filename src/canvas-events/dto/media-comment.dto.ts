import { IsString } from 'class-validator';

export class MediaCommentDto {
  @IsString()
  'content-type': string;

  @IsString()
  display_name: string;

  @IsString()
  media_id: string;

  @IsString()
  media_type: string;

  @IsString()
  url: string;
}

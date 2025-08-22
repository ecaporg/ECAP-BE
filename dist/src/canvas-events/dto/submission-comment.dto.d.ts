import { MediaCommentDto } from './media-comment.dto';
export declare class SubmissionCommentDto {
    id: number;
    author_id: number;
    author_name: string;
    author?: any;
    comment: string;
    created_at: string;
    edited_at?: string;
    media_comment?: MediaCommentDto;
}

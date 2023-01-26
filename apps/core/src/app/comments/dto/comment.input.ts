import {InputType} from '@nestjs/graphql';
import {Comment} from '../models/comment.model';

@InputType()
export class CommentInput extends Comment {}

import {Injectable} from '@nestjs/common';
import {CommentInput} from './dto/comment.input';
import {Comment} from './models/comment.model';

const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    title: 'Great post',
  },
];

@Injectable()
export class CommentsService {
  async addComment(input: { id: number, comment: CommentInput })
    : Promise<Comment> {
    const {id, comment} = input;
    const newComment: Comment = {
      id: 2,
      postId: id,
      title: comment.title,
    };

    comments.push(newComment);

    return newComment;
  }
}

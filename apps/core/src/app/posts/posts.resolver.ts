import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PubSub} from 'graphql-subscriptions';
import {CommentsService} from '../comments/comments.service';
import {CommentInput} from '../comments/dto/comment.input';
import {Comment} from '../comments/models/comment.model';
import {Post} from './models/post.model';
import {PostsService} from './posts.service';

const pubSub = new PubSub();

@Resolver((of) => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
  ) {}

  @Query((returns) => Post, {name: 'post'})
  async getPost(@Args('id', {type: () => Int}) id: number) {
    return this.postsService.findOneById(id);
  }

  // @Mutation((returns) => Post)
  // async addComment(
  //   @Args('postId', {type: () => Int}) postId: number,
  //   @Args('comment', {type: () => Comment}) comment: CommentInput,
  // ) {
  //   const newComment = await this.commentsService
  //       .addComment({id: postId, comment});
  //   pubSub.publish('commentAdded', {commentAdded: newComment});
  //   return newComment;
  // }
}

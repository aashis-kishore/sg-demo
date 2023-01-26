import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import {PubSub} from 'graphql-subscriptions';
import {Comment} from '../comments/models/comment.model';
import {UpvotePostInput} from '../posts/dto/upvote-post.input';
import {Post} from '../posts/models/post.model';
import {PostsService} from '../posts/posts.service';
import {AuthorsService} from './authors.service';
import {Author} from './models/author.model';

const pubSub = new PubSub();

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query((returns) => Author, {name: 'author'})
  async getAuthor(@Args('id', {type: () => Int}) id: number): Promise<Author> {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const {id} = author;
    return this.postsService.findAllByAuthorId(id);
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    return this.postsService.upvotePost(upvotePostData);
  }

  // @Subscription((returns) => Comment, {name: 'commentAdded'})
  // subscribeToCommentAdded() {
  //   return pubSub.asyncIterator('commentAdded');
  // }
}

import {Module} from '@nestjs/common';
import {CommentsModule} from '../comments/comments.module';
import {PostsResolver} from './posts.resolver';
import {PostsService} from './posts.service';

@Module({
  imports: [CommentsModule],
  providers: [PostsResolver, PostsService],
  exports: [PostsResolver, PostsService],
})
export class PostsModule {}

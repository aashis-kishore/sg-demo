import {Injectable} from '@nestjs/common';
import {PostsService} from '../posts/posts.service';
import {Author} from './models/author.model';

@Injectable()
export class AuthorsService {
  constructor(private readonly postsService: PostsService) {}

  async findOneById(id: number): Promise<Author> {
    const posts = await this.postsService.findAllByAuthorId(id);

    return {
      id: 1,
      firstName: 'Aashis',
      lastName: 'Kishore',
      // posts: [],
      posts,
    };
  }
}

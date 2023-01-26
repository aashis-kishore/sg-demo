import {Injectable} from '@nestjs/common';
import {UpvotePostInput} from './dto/upvote-post.input';
import {Post} from './models/post.model';

export const posts: Post[] = [
  {
    id: 1,
    title: 'Why my post is a good one?',
    votes: 3,
  },
  {
    id: 2,
    title: 'Every day is a new day',
    votes: 4,
  },
];

@Injectable()
export class PostsService {
  async findOneById(id: number): Promise<Post> {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new Error('unknown post id');
    }

    return post;
  }

  async findAllByAuthorId(authorId: number): Promise<Post[]> {
    return posts;
  }

  async findAll(id: number): Promise<Post[]> {
    return posts;
  }

  async upvotePost(input: UpvotePostInput): Promise<Post> {
    const {postId} = input;
    const idOfPostToUpvote = posts.findIndex((post) => post.id === postId);

    if (idOfPostToUpvote === -1) {
      throw new Error('unknown post id');
    }

    let postOfId = posts[idOfPostToUpvote];

    postOfId = {...postOfId, votes: postOfId.votes + 1};

    posts.splice(idOfPostToUpvote, 1, postOfId);

    return postOfId;
  }
}

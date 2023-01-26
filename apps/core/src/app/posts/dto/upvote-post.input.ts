import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class UpvotePostInput {
  @Field((returns) => Int)
    postId: number;
}

import {ArgsType, Field} from '@nestjs/graphql';
import {MinLength} from 'class-validator';
import {PaginationArgs} from './pagination.args';

@ArgsType()
export class GetAuthorArgs extends PaginationArgs {
  @Field({nullable: true})
    firstName?: string;

  @Field({defaultValue: ''})
  @MinLength(3)
    lastName: string;
}

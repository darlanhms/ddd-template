import { Field, InputType, Int, ObjectType } from 'type-graphql';

@InputType()
export class BasePaginationRequest {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}

@ObjectType()
export class BasePaginationResponse {
    @Field(() => Int)
    total: number;
}

import { buildSchema, Resolver, Query } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

@Resolver()
class HelloWorld {
    @Query(() => String)
    public hello(): string {
        return 'hello world';
    }
}

const createSchema = (): Promise<GraphQLSchema> =>
    buildSchema({
        resolvers: [HelloWorld],
    });

export default createSchema;

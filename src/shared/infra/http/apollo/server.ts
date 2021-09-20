import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import createSchema from './schema';
import formatErrorPlugin from './plugins/formatError';

const apolloServer = async (app: Express): Promise<void> => {
    const schema = await createSchema();

    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({
            req,
        }),
        plugins: [formatErrorPlugin],
    });

    server.applyMiddleware({ app });
};

export default apolloServer;

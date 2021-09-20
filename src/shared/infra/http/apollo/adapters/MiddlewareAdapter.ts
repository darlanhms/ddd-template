import BaseResolver from '@core/infra/BaseResolver';
import { Middleware } from '@core/infra/Middleware';
import { ExpressContext } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';

export default function adaptMiddleware(middleware: Middleware): MiddlewareFn<ExpressContext> {
    return async ({ context, args }, next) => {
        const requestData = { ...context.req.headers, accessToken: context.req.headers.authorization };

        const result = await middleware.handle(requestData, { ...args, ...args.payload });

        if (result.isLeft()) {
            throw BaseResolver.genericErrorResponse(result.value);
        }

        if (!result.value) {
            return null;
        }

        return next();
    };
}

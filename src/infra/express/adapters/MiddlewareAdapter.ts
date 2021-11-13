import { Middleware } from '@core/infra/Middleware';
import GenericErrors from '@core/logic/GenericErrors';
import { NextFunction, Request, Response } from 'express';

export default function adaptMiddleware(middleware: Middleware) {
    return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const requestData = {
            accessToken: req.headers.authorization,
            ...(req.headers || {}),
        };

        const result = await middleware.handle(requestData, { ...req.body, ...req.query, ...req.params });

        if (result.isLeft()) {
            return res
                .status(GenericErrors.getStatusCode(result.value))
                .json({ message: result.value.message });
        }

        if (!result.value) {
            return res.status(200).send();
        }

        return next();
    };
}

import { Either } from '@core/logic/Either';
import GenericAppError from '@core/logic/GenericAppError';

export type MiddlewareResponse = Either<GenericAppError, boolean>;

export interface Middleware<T = any, U = any> {
    handle: (httpRequest: T, httpBody?: U) => Promise<MiddlewareResponse>;
}

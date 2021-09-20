import GenericErrors from '@core/logic/GenericErrors';
import IAuthTokenService from '@user/services/IAuthTokenService';
import { AuthenticationError, ExpressContext } from 'apollo-server-express';

export default class GqlAuthChecker {
    public constructor(private authTokenService: IAuthTokenService) {}

    public execute(context: ExpressContext): boolean {
        const token = context.req.headers.authorization;

        if (!token) {
            throw new AuthenticationError(new GenericErrors.NotAuthorized().message);
        }

        const verifiedToken = this.authTokenService.decode(token);

        if (!verifiedToken) {
            throw new AuthenticationError(new GenericErrors.NotAuthorized().message);
        }

        return true;
    }
}

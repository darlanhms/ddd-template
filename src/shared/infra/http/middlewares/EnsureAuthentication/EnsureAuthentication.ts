import { Middleware, MiddlewareResponse } from '@core/infra/Middleware';
import { left, right } from '@core/logic/Either';

import FindUserByToken from '@user/useCases/user/findUserByToken/findUserByToken';
import IAuthContext from '../../contexts/IAuthContext';

interface AuthenticationRequestData {
    accessToken: string;
}

export default class EnsureAuthentication implements Middleware {
    constructor(private findUserByToken: FindUserByToken, private authContext: IAuthContext) {}

    public async handle(requestData: AuthenticationRequestData): Promise<MiddlewareResponse> {
        const userOrError = await this.findUserByToken.execute(requestData.accessToken);

        if (userOrError.isLeft()) {
            return left(userOrError.value);
        }

        this.authContext.setValue('userId', userOrError.value.id.toValue());

        return right(true);
    }
}

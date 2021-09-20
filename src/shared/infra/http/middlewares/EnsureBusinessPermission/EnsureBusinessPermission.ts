import { left, right } from '@core/logic/Either';
import GenericErrors from '@core/logic/GenericErrors';
import IUserRepository from '@user/repositories/IUserRepository';
import { Middleware, MiddlewareResponse } from '@core/infra/Middleware';
import IAuthContext from '../../contexts/IAuthContext';

interface EnsureBusinessPermissionDTO {
    businessId: string;
}

export default class EnsureBusinessPermission implements Middleware {
    constructor(private userRepo: IUserRepository, private authContext: IAuthContext) {}

    public async handle(_: unknown, payload: EnsureBusinessPermissionDTO): Promise<MiddlewareResponse> {
        if (!payload.businessId) {
            return left(new GenericErrors.NotAuthorized('ID do estabelecimeno não informado'));
        }

        const userId = this.authContext.getValue('userId');

        if (!userId) {
            throw new Error('business permission middleware must be used after authentication middleware');
        }

        const user = await this.userRepo.findWithBusiness(userId);

        if (!user) {
            return left(new GenericErrors.NotAuthorized('usuário não encontrado'));
        }

        const userHasBusiness = user.businesses?.find(business => business.id.equalsRaw(payload.businessId));

        if (!userHasBusiness) {
            return left(new GenericErrors.NotAuthorized('usuário não tem permissões no estabelecimento'));
        }

        return right(true);
    }
}

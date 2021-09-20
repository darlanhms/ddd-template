import Repository from '@core/infra/Repository';
import { GenericId } from '@core/utils/types';
import User from '@user/domain/user';

export default interface IUserRepository extends Repository<User> {
    delete(id: GenericId): Promise<User> | User;
}

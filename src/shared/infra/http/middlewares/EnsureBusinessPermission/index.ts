import UserRepository from '@user/repositories/implementations/TypeORM/UserRepository';
import AuthContext from '../../contexts/cls/AuthContext';
import EnsureBusinessPermission from './EnsureBusinessPermission';

const userRepo = new UserRepository();

const authContext = new AuthContext();

const ensureBusinessPermission = new EnsureBusinessPermission(userRepo, authContext);

export { ensureBusinessPermission };

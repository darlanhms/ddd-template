import { findUserByToken } from '@user/useCases/user/findUserByToken';
import AuthContext from '../../contexts/cls/AuthContext';
import EnsureAuthentication from './EnsureAuthentication';

const authContext = new AuthContext();

const ensureAuthentication = new EnsureAuthentication(findUserByToken, authContext);

export { ensureAuthentication };

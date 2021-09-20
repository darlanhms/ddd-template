import AuthTokenService from '@user/services/implementations/AuthTokenService';
import GqlAuthChecker from './graphqlAuthChecker';

const authTokenService = new AuthTokenService();

const gqlAuthChecker = new GqlAuthChecker(authTokenService);

export { gqlAuthChecker };

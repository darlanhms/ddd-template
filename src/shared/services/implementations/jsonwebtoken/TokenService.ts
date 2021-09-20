import { GenericTokenPayload } from '@core/utils/types';
import tokenConfig from '@shared/config/tokenConfig';
import * as jwt from 'jsonwebtoken';
import ITokenService from '../../ITokenService';

export default class TokenService<T extends GenericTokenPayload> implements ITokenService<T> {
    public encode(payload: T, exp = tokenConfig.expiresIn): string {
        return jwt.sign(payload, tokenConfig.secret, {
            expiresIn: exp,
        });
    }

    public decode(token: string): T | null {
        try {
            if (!token) {
                return null;
            }

            const decoded = jwt.verify(token, tokenConfig.secret);

            return decoded as T;
        } catch (error) {
            return null;
        }
    }
}

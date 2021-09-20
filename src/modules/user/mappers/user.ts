import UniqueEntityID from '@core/domain/UniqueEntityID';
import User from '@user/domain/user';
import { User as PrismaUser } from '.prisma/client';
import UserDTO from '../dtos/user';

export default class UserMapper {
    public static toDomain(user: PrismaUser): User {
        return User.create(
            {
                username: user.username,
                password: user.password,
            },
            new UniqueEntityID(user.id),
        ).value as User;
    }

    public static toPersistence(user: User): PrismaUser {
        return {
            id: user.id.toValue(),
            username: user.username,
            password: user.password,
        };
    }

    public static toDTO(user: User): UserDTO {
        return {
            id: user.id.toValue(),
            password: user.password,
            username: user.username,
        };
    }
}

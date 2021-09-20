import BaseRepository from '@core/infra/prisma/BaseRepository';
import { GenericId } from '@core/utils/types';
import User from '@user/domain/user';
import UserMapper from '@user/mappers/user';
import IUserRepository from '@user/repositories/IUserRepository';

export default class PrismaUserRepository extends BaseRepository implements IUserRepository {
    public async insert(user: User): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: UserMapper.toPersistence(user),
        });

        return UserMapper.toDomain(newUser);
    }

    public async update(user: User): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            data: UserMapper.toPersistence(user),
            where: {
                id: this.getId(user.id),
            },
        });

        return UserMapper.toDomain(updatedUser);
    }

    public async delete(id: GenericId): Promise<User> {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id: this.getId(id),
            },
        });

        return UserMapper.toDomain(deletedUser);
    }

    public async findById(id: GenericId): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: this.getId(id),
            },
        });

        return user ? UserMapper.toDomain(user) : null;
    }
}

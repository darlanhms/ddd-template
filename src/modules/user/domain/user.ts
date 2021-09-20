import Entity from '@core/domain/Entity';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import { Either, right } from '@core/logic/Either';
import GenericAppError from '@core/logic/GenericAppError';

interface IUserProps {
    username: string;
    password: string;
}

export default class User extends Entity<IUserProps> {
    constructor(props: IUserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get username(): string {
        return this.props.username;
    }

    get password(): string {
        return this.props.password;
    }

    public static create(props: IUserProps, id?: UniqueEntityID): Either<GenericAppError, User> {
        return right(new User(props, id));
    }
}

import UniqueEntityID from '@core/domain/UniqueEntityID';
import { RawID } from '@utils/types';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

interface Repository<Domain> {
    insert(entity: Domain): Promise<Domain> | Domain;

    update(entity: Domain): Promise<Domain> | Domain;

    findById(id: UniqueEntityID | RawID): SingleEntityResponse<Domain>;
}

export default Repository;

import UniqueEntityID from '@core/domain/UniqueEntityID';
import { RawID, UpdateFields } from '@utils/types';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

interface Repository<Domain> {
    insert(entity: Domain): Promise<Domain> | Domain;

    update(entity: UpdateFields<Domain>): Promise<RawID> | RawID;

    delete(id: UniqueEntityID | RawID): Promise<boolean> | boolean;

    findById(id: UniqueEntityID | RawID): SingleEntityResponse<Domain>;
}

export default Repository;

import UniqueEntityID from '@core/domain/UniqueEntityID';
import { UpdateFields } from '@core/utils/types';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

interface Repository<Domain> {
    insert(entity: Domain): SingleEntityResponse<Domain>;
    update(entity: UpdateFields<Domain>): Promise<string> | string;
    delete(id: UniqueEntityID | string): Promise<boolean> | boolean;
    findById(id: UniqueEntityID | string): SingleEntityResponse<Domain>;
}

export default Repository;

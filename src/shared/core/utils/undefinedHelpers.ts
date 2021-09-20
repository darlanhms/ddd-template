import UniqueEntityID from '@core/domain/UniqueEntityID';

export function validUniqueID(uniqueId?: string): UniqueEntityID | undefined {
    return uniqueId ? new UniqueEntityID(uniqueId) : undefined;
}

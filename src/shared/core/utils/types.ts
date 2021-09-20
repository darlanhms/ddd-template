/* eslint-disable @typescript-eslint/ban-types */
import UniqueEntityID from '../domain/UniqueEntityID';

export type UpdateFields<T> = {
    [P in keyof T]?: T[P];
} & {
    id: UniqueEntityID | RawID;
};

export type UpdateDTO<T> = {
    [P in keyof T]?: T[P];
} & {
    id: string;
};

export type AllOptional<T> = {
    [P in keyof T]?: T[P] | undefined;
};

export type RawID = number | string;

export type GenericId = string | UniqueEntityID;

export type GenericEntity = Record<string | number | symbol, any> & { id: UniqueEntityID | RawID };

export type GenericTokenPayload = string | object | Buffer;

export type OmitDefault<T> = Omit<T, 'id' | 'enabled' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

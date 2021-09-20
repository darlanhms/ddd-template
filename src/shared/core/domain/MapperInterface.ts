import { AllOptional, GenericEntity } from '@utils/types';

export default interface MapperInterface<Domain, Interface extends GenericEntity> {
    toDomain(raw: Interface): Promise<Domain> | Domain;
    toPersistence(raw: AllOptional<Domain>): Promise<AllOptional<Interface>> | AllOptional<Interface>;
}

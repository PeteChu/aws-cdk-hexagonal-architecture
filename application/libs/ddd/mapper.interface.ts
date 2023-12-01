import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<T>,
  DbRecord,
  Response = T,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: T): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}

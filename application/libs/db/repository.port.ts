import { Result } from "../types/result"

export interface RepositoryPort<Entity> {
  find(item?: Entity): Promise<Result<Entity[], Error>>
  findOne(id: string): Promise<Result<Entity, Error>>
  create(payload: Entity): Promise<Result<boolean, Error>>
  update(id: string, payload: Entity): Promise<boolean>
  delete(id: string): Promise<boolean>
}

import { Result } from "../types/result"

export interface RepositoryPort<Entity> {
  find(item: Entity): Promise<Entity[]>
  findOne(id: string): Promise<Entity>
  create(payload: Entity): Promise<Result<boolean, Error>>
  update(id: string, payload: Entity): Promise<boolean>
  delete(id: string): Promise<boolean>
}

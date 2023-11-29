export interface RepositoryPort<Entity> {
  find(item: Entity): Promise<Entity[]>
  findOne(id: string): Promise<Entity>
  create(paylod: Entity): Promise<Entity>
  update(id: string, payload: Entity): Promise<boolean>
  delete(id: string): Promise<boolean>
}

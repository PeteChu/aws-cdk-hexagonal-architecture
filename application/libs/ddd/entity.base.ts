export type AggregateID = string;

export interface BaseEntityProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateID;
  createdAt?: Date;
  updatedAt?: Date;
  props: T
}

export abstract class Entity<EntityProps> {

  constructor({ id, createdAt, updatedAt, props }: CreateEntityProps<EntityProps>) {
    this.setId(id)
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props
    this.validate()
  }
  protected readonly props: EntityProps;

  protected abstract _id: AggregateID;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateID {
    return this._id;
  }

  private setId(id: AggregateID): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props
    }
    return Object.freeze(propsCopy)
  }

  abstract validate(): void
}

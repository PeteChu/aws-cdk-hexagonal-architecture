import { Entity } from '@app/libs/ddd/entity.base';
import * as crypto from 'crypto'

export enum TodoStatus {
  IN_PROGRESS = 'In-Progress',
  COMPLETED = 'Completed'
}

export interface TodoProps {
  id?: string,
  text: string,
  status: TodoStatus,
  createdAt?: string,
  updatedAt?: string
}

export interface CreateTodoProps {
  text: string
}

export class TodoEntity extends Entity<TodoProps> {
  protected _id: string;

  static create(create: CreateTodoProps): TodoEntity {
    const id = crypto.randomUUID()
    const props: TodoProps = { ...create, status: TodoStatus.IN_PROGRESS }
    const todo = new TodoEntity({ id, props })
    return todo
  }
}

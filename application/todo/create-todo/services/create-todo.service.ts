import { TodoModel } from "../entities/todo.entity";
import { RepositoryPort } from "../repositories/repository.port";

interface CreateTodoRepositoryPort extends RepositoryPort<TodoModel> { }

interface ICreateTodo {
  createTodo(item: TodoModel): Promise<TodoModel>
}

export class CreateTodoService implements ICreateTodo {

  constructor(private readonly repository: CreateTodoRepositoryPort) { }

  async createTodo(item: TodoModel): Promise<TodoModel> {

    if (!item.text) {
      throw Error('"text" is required')
    }

    return await this.repository.create(item)
  }


}

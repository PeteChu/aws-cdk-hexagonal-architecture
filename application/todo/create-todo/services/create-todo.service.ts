import { BadRequestErrorException } from "../../../libs/exceptions/exceptions";
import { Err, Ok, Result } from "../../../libs/types/result";
import { TodoModel } from "../entities/todo.entity";
import { RepositoryPort } from "../repositories/repository.port";

interface CreateTodoRepositoryPort extends RepositoryPort<TodoModel> { }

interface ICreateTodo {
  createTodo(item: TodoModel): Promise<Result<TodoModel, Error>>
}

export class CreateTodoService implements ICreateTodo {

  constructor(private readonly repository: CreateTodoRepositoryPort) { }

  async createTodo(item: TodoModel): Promise<Result<TodoModel, Error>> {
    if (!item.text) {
      const exception = new BadRequestErrorException("property 'text' is required.")
      return Err(exception)
    }
    return Ok(await this.repository.create(item))
  }
}

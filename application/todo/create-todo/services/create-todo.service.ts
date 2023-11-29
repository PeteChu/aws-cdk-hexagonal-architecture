import { BadRequestErrorException } from "@app/libs/exceptions/exceptions";
import { CreateTodoProps, TodoEntity } from "../entities/todo.entity";
import { RepositoryPort } from "../repositories/repository.port";
import { Err, Ok, Result } from "@app/libs/types/result";

interface CreateTodoRepositoryPort extends RepositoryPort<TodoEntity> { }

interface ICreateTodo {
  createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>>
}

export class CreateTodoService implements ICreateTodo {

  constructor(private readonly repository: CreateTodoRepositoryPort) { }

  async createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>> {
    if (!item.text) {
      const exception = new BadRequestErrorException("property 'text' is required.")
      return Err(exception)
    }

    const todo = TodoEntity.create(item)
    const response = await this.repository.create(todo)
    console.log(response.getProps())
    return Ok(response)
  }

}

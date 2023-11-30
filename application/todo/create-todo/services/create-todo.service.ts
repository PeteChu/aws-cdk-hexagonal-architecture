import { BadRequestErrorException } from "@app/libs/exceptions/exceptions";
import { CreateTodoProps, TodoEntity } from "../entities/todo.entity";
import { Err, Ok, Result } from "@app/libs/types/result";
import { TodoRepositoryPort } from "@app/todo/repositories/todo.repository.port";

interface ICreateTodo {
  createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>>
}

export class CreateTodoService implements ICreateTodo {

  constructor(private readonly repository: TodoRepositoryPort) { }

  async createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>> {
    if (!item.text) {
      const exception = new BadRequestErrorException("property 'text' is required.")
      return Err(exception)
    }

    const todo = TodoEntity.create(item)

    const response = await this.repository.create(todo)
    if (!response.ok) {
      // Handle error
      return response
    }
    return Ok(todo)
  }

}

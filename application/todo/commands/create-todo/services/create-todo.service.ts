import { BadRequestException } from "@app/libs/exceptions/exceptions";
import { TodoEntity } from "../../../domain/todo.entity";
import { Err, Ok, Result } from "@app/libs/types/result";
import { TodoRepositoryPort } from "@app/todo/repositories/todo.repository.port";
import { CreateTodoProps } from "@app/todo/domain/todo.types";
import { TodoMapper } from "@app/todo/domain/todo.mapper";
import { container } from "tsyringe";

interface ICreateTodo {
  createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>>
}

export class CreateTodoService implements ICreateTodo {

  private mapper: TodoMapper = container.resolve(TodoMapper)


  constructor(private readonly repository: TodoRepositoryPort) { }

  async createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>> {
    if (!item.text) {
      const exception = new BadRequestException("property 'text' is required.")
      return Err(exception)
    }

    const todo = TodoEntity.create(item)


    const response = await this.repository.create(this.mapper.toPersistence(todo))
    if (!response.ok) {
      // Handle error
      return response
    }
    return Ok(todo)
  }

}

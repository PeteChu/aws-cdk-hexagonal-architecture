import { BadRequestException } from "@app/libs/exceptions/exceptions";
import { TodoEntity } from "../../../domain/todo.entity";
import { Err, Ok, Result } from "@app/libs/types/result";
import { TodoRepositoryPort } from "@app/todo/repositories/todo.repository.port";
import { CreateTodoProps, CreateTodoInputProps } from "@app/todo/domain/todo.types";
import { TodoMapper } from "@app/todo/domain/todo.mapper";
import { container } from "tsyringe";
import { ValidateInputSchema } from "@app/libs/decorators/schema-validator";

interface ICreateTodo {
  createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>>
}

export class CreateTodoService implements ICreateTodo {

  private mapper: TodoMapper = container.resolve(TodoMapper)


  constructor(private readonly repository: TodoRepositoryPort) { }

  @ValidateInputSchema(CreateTodoInputProps)
  async createTodo(item: CreateTodoProps): Promise<Result<TodoEntity, Error>> {
    const todo = TodoEntity.create(item)

    const response = await this.repository.create(this.mapper.toPersistence(todo))
    if (!response.ok) {
      // Handle error
      return response
    }
    return Ok(todo)
  }

}

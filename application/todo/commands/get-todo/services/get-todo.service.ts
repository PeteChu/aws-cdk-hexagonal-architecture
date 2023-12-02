import { ValidateInputSchema } from "@app/libs/decorators/schema-validator";
import { InternalServerErrorException } from "@app/libs/exceptions/exceptions";
import { Err, Ok, Result } from "@app/libs/types/result";
import { TodoModel } from "@app/todo/domain/todo.model";
import { GetTodoInputProps, GetTodoProps } from "@app/todo/domain/todo.types";
import { TodoDDBRepository } from "@app/todo/repositories/todo.ddb.repository";

export interface GetTodo {
  getTodo(input: GetTodoProps): Promise<Result<TodoModel, Error>>
}


export class GetTodoService implements GetTodo {

  constructor(private readonly repository: TodoDDBRepository) { }

  @ValidateInputSchema(GetTodoInputProps)
  async getTodo(input: GetTodoProps): Promise<Result<TodoModel, Error>> {

    if (input.id) {
      const output = await this.repository.findOne(input.id)
      if (!output.ok) {
        return Err(output.error)
      }
      return Ok(output.value)
    }

    return Err(new InternalServerErrorException())
  }

}

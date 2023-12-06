import { InternalServerErrorException } from "@app/libs/exceptions/exceptions";
import { Err, Ok, Result } from "@app/libs/types/result";
import { TodoModel } from "../domain/todo.model";
import { TodoRepositoryPort } from "./todo.repository.port";
import { TodoMapper } from "../domain/todo.mapper";
import { container } from "tsyringe";
import { PostgreSQLRepository } from "@app/libs/db/postgresql.repository";
import { todos } from "drizzle/schema";

export class TodoPostgreSQLRepository
  extends PostgreSQLRepository<TodoModel>
  implements TodoRepositoryPort
{
  private mapper: TodoMapper = container.resolve(TodoMapper);

  constructor(protected readonly dbName: string) {
    super(dbName);
  }

  async create(payload: TodoModel): Promise<Result<boolean, Error>> {
    try {
      const response = await this.db
        .insert(todos)
        .values({ ...payload })
        .returning();
      console.log(response);
    } catch (e: unknown) {
      console.log(e);
      return Err(new InternalServerErrorException());
    }
    return Ok(true);
  }
}

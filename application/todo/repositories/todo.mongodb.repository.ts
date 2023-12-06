import { TodoModel } from "../domain/todo.model";
import { TodoRepositoryPort } from "./todo.repository.port";
import { TodoMapper } from "../domain/todo.mapper";
import { container } from "tsyringe";
import { MongoDBRepository } from "@app/libs/db/mongodb.repository";
import { Err, Ok, Result } from "@app/libs/types/result";
import { InternalServerErrorException } from "@app/libs/exceptions/exceptions";

export class TodoMongoDBRepository
  extends MongoDBRepository<TodoModel>
  implements TodoRepositoryPort
{
  private mapper: TodoMapper = container.resolve(TodoMapper);

  constructor(
    protected readonly dbName: string,
    protected readonly collectionName: string,
  ) {
    super(dbName, collectionName);
  }

  async create(payload: TodoModel): Promise<Result<boolean, Error>> {
    try {
      await this.collection.insertOne(payload);
    } catch (e) {
      console.log(e);
      return Err(new InternalServerErrorException(e as string));
    }
    return Ok(true);
  }
}

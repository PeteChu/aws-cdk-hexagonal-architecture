import { DynamoDBRepository } from "@app/libs/db/dynamodb.repository";
import { InternalServerErrorException } from "@app/libs/exceptions/exceptions";
import { Err, Ok, Result } from "@app/libs/types/result";
import { PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { TodoModel } from "../domain/todo.model";
import { TodoRepositoryPort } from "./todo.repository.port";
import { TodoMapper } from "../domain/todo.mapper";
import { container } from "tsyringe";

export class TodoDDBRepository extends DynamoDBRepository<TodoModel> implements TodoRepositoryPort {

  private mapper: TodoMapper = container.resolve(TodoMapper)

  constructor(tableName: string) {
    super(tableName)
  }

  async create(payload: TodoModel): Promise<Result<boolean, Error>> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: marshall(payload)
    }

    try {
      await this.ds.send(new PutCommand(input))
    } catch (e: unknown) {
      console.log(e)
      return Err(new InternalServerErrorException())
    }
    return Ok(true)
  }

  async update(id: string, payload: TodoModel): Promise<boolean> {
    const input: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        "id": id
      },
      UpdateExpression: "set Text = :text",
      ExpressionAttributeValues: {
        ":text": payload.text
      },
    }
    const commandOutput = await this.ds.send(new UpdateCommand(input))
    return commandOutput.$metadata.httpStatusCode === 200
  }
}

import { TodoRepositoryPort } from "./todo.repository.port";
import { PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDBRepository } from "@app/libs/db/dynamodb.repository";
import { Err, Ok, Result } from "@app/libs/types/result";
import { marshall } from "@aws-sdk/util-dynamodb";
import { TodoModel } from "../domain/todo.model";


export class TodoDDBRepository extends DynamoDBRepository<TodoModel> implements TodoRepositoryPort {

  constructor(tableName: string) {
    super(tableName)
  }

  async create(payload: TodoModel): Promise<Result<boolean, Error>> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: marshall(payload)
    }
    try {
      const commandOutput = await this.ds.send(new PutCommand(input))
      return Ok(
        commandOutput.$metadata.httpStatusCode === 200
      )
    } catch (e) {
      console.log(e)
      return Err(e as Error)
    }
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
      // ConditionExpression: "attribute_not_exists('deleted')"
    }
    const commandOutput = await this.ds.send(new UpdateCommand(input))
    return commandOutput.$metadata.httpStatusCode === 200
  }

}

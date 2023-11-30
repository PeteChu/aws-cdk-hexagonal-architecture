import { z } from "zod";
import { TodoRepositoryPort } from "./todo.repository.port";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDBRepository } from "@app/libs/db/dynamodb.repository";
import { TodoEntity } from "../create-todo/entities/todo.entity";
import { Err, Ok, Result } from "@app/libs/types/result";

export const todoSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  status: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date())
})

export type TodoModel = z.TypeOf<typeof todoSchema>

export class TodoDDBRepository extends DynamoDBRepository<TodoEntity> implements TodoRepositoryPort {

  constructor(tableName: string) {
    super(tableName)
  }

  async create(payload: TodoEntity): Promise<Result<boolean, Error>> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        ...payload.getProps()
      }
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

}

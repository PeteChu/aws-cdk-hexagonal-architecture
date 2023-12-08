import { DynamoDBRepository } from "@app/libs/db/dynamodb.repository";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@app/libs/exceptions/exceptions";
import { Err, Ok, Result } from "@app/libs/types/result";
import {
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { TodoModel, todoSchema } from "../domain/todo.model";
import { TodoRepositoryPort } from "./todo.repository.port";

export class TodoDDBRepository
  extends DynamoDBRepository<TodoModel>
  implements TodoRepositoryPort
{
  constructor(tableName: string) {
    super(tableName);
  }

  async create(payload: TodoModel): Promise<Result<boolean, Error>> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: payload,
    };

    try {
      await this.ds.send(new PutCommand(input));
    } catch (e: unknown) {
      console.log(e);
      return Err(new InternalServerErrorException());
    }
    return Ok(true);
  }

  async update(id: string, payload: TodoModel): Promise<boolean> {
    const input: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
      UpdateExpression: "set Text = :text",
      ExpressionAttributeValues: {
        ":text": payload.text,
      },
    };
    const commandOutput = await this.ds.send(new UpdateCommand(input));
    return commandOutput.$metadata.httpStatusCode === 200;
  }

  async findOne(id: string): Promise<Result<TodoModel, Error>> {
    const input: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
      ConsistentRead: false,
    };
    const commandOutput = await this.ds.send(new QueryCommand(input));

    if (commandOutput.$metadata.httpStatusCode !== 200) {
      return Err(new InternalServerErrorException());
    }

    try {
      const [item] = commandOutput.Items ?? [];

      if (!item) {
        return Err(new NotFoundException(`Todo with id "${id}" not found.`));
      }

      return Ok(todoSchema.parse(unmarshall(item)));
    } catch (e) {
      console.log(e);
      return Err(new InternalServerErrorException());
    }
  }

  async find(payload?: TodoModel): Promise<Result<TodoModel[], Error>> {
    if (!payload) {
      const input: ScanCommandInput = {
        TableName: this.tableName,
        Limit: 10,
      };
      const items = await this.ds.send(new ScanCommand(input));
      return Ok(
        (items.Items ?? []).map((x) => todoSchema.parse(unmarshall(x))),
      );
    }

    // TODO: implement find todos from payload
    throw new Error("Method not implemented.");
  }
}

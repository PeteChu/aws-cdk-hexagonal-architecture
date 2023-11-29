import { AttributeValue, DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { RepositoryPort } from "./repository.port";
import { TodoStatus, TodoEntity } from "../entities/todo.entity";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { unmarshallOutput } from "@aws-sdk/lib-dynamodb/dist-types/commands/utils";
import { todoSchema } from "./todo.repository";
import { TodoMapper } from "../todo.mapper";

export class DynamoDBRepository implements RepositoryPort<TodoEntity> {

  private ds: DynamoDBDocumentClient

  constructor(private readonly tableName: string) {
    const dynamoDB = new DynamoDB()
    this.ds = DynamoDBDocumentClient.from(dynamoDB)
  }

  find(item: TodoEntity): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async create(payload: TodoEntity): Promise<TodoEntity> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        ...payload.getProps()
      }
    }

    const { Attributes = {} } = await this.ds.send(new PutCommand(input))
    const output = unmarshall(Attributes)
    return new TodoMapper().toDomain(todoSchema.parse(output))
  }

  update(id: string, payload: TodoEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }


}

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { RepositoryPort } from "./repository.port";
import { TodoStatus, TodoModel } from "../entities/todo.entity";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export class DynamoDBRepository implements RepositoryPort<TodoModel> {

  private ds: DynamoDBDocumentClient

  constructor(private readonly tableName: string) {
    const dynamoDB = new DynamoDB()
    this.ds = DynamoDBDocumentClient.from(dynamoDB)
  }

  find(item: TodoModel): Promise<TodoModel[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<TodoModel> {
    throw new Error("Method not implemented.");
  }

  async create(payload: TodoModel): Promise<TodoModel> {

    const item = {
      id: this.genSimpleID(),
      text: payload.text,
      status: TodoStatus.IN_PROGRESS,
      createdAt: Math.floor(Date.now() / 1000),
    }

    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        ...item
      }
    }

    await this.ds.send(new PutCommand(input))
    return item
  }

  update(id: string, payload: TodoModel): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private genSimpleID(idLength = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const id = Array(idLength)
      .fill('')
      .map(() => characters.charAt(Math.floor(Math.random() * idLength)))
      .reduce((acc, char) => acc + char);
    return id;
  }

}

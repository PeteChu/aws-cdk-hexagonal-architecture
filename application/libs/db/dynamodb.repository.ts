import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Result } from "../types/result";
import { RepositoryPort } from "./repository.port";

export abstract class DynamoDBRepository<Aggregate>
  implements RepositoryPort<Aggregate>
{
  protected readonly ds: DynamoDBDocumentClient;

  constructor(protected readonly tableName: string) {
    const dynamoDB = new DynamoDBClient();
    this.ds = DynamoDBDocumentClient.from(dynamoDB);
  }

  find(item?: Aggregate): Promise<Result<Aggregate[], Error>> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<Result<Aggregate, Error>> {
    throw new Error("Method not implemented.");
  }

  create(payload: Aggregate): Promise<Result<boolean, Error>> {
    throw new Error("Method not implemented.");
  }

  update(id: string, payload: Aggregate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

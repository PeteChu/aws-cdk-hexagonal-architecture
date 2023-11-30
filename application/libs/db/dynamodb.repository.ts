import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { RepositoryPort } from "./repository.port";
import { Result } from "../types/result";

export abstract class DynamoDBRepository<Aggregate> implements RepositoryPort<Aggregate> {

  protected readonly ds: DynamoDBDocumentClient

  constructor(protected readonly tableName: string) {
    const dynamoDB = new DynamoDB()
    this.ds = DynamoDBDocumentClient.from(dynamoDB)
  }

  find(item: Aggregate): Promise<Aggregate[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: string): Promise<Aggregate> {
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

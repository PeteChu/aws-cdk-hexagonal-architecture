import { RepositoryPort } from "./repository.port";
import { Result } from "../types/result";
import * as mongodb from "mongodb";

export abstract class MongoDBRepository<Aggregate>
  implements RepositoryPort<Aggregate>
{
  protected readonly collection: mongodb.Collection;

  constructor(
    protected readonly dbName: string,
    protected readonly collectionName: string,
  ) {
    const uri = `mongodb://root:toor@localhost:27017/`;
    const mongoClient = new mongodb.MongoClient(uri);
    (async () => {
      await mongoClient.connect();
    })();
    const db = mongoClient.db(dbName);
    this.collection = db.collection(collectionName);
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

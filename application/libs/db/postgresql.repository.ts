import { Pool } from "pg";
import { Result } from "../types/result";
import { RepositoryPort } from "./repository.port";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

export class PostgreSQLRepository<Aggregate>
  implements RepositoryPort<Aggregate>
{
  protected readonly db: NodePgDatabase;

  constructor(protected readonly dbName: string) {
    const pool = new Pool({
      connectionString: `postgres://postgres@localhost:5432/${dbName}`,
    });

    this.db = drizzle(pool);
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

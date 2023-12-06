import type { Config } from "drizzle-kit";

export default {
  schema: "./schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://postgres@localhost:5432/todo",
  },
} satisfies Config;

import { pgTable, varchar, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const todos = pgTable("todos", {
	id: varchar("id").primaryKey().notNull(),
	text: text("text"),
	status: varchar("status"),
	createdAt: varchar("createdAt"),
	updatedAt: varchar("updatedAt"),
});
import { z } from "zod";
import { TodoStatus } from "../entities/todo.entity";

export const todoSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  status: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date())
})

export type TodoModel = z.TypeOf<typeof todoSchema>

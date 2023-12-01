/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"

export const todoSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  status: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime()),
  updatedAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime())
})

export type TodoModel = z.TypeOf<typeof todoSchema>

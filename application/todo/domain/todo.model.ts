import { z } from "zod"

export const todoSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  status: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime()),
  updatedAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime())
  // createdAt: z.coerce.date(),
  // updatedAt: z.coerce.date()
})

export type TodoModel = z.TypeOf<typeof todoSchema>

/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"
import { mapKeys, camel } from 'radash'

export const todoSchema = z.record(z.any())
  .transform(x => mapKeys(x, camel))
  .pipe(z.object({
    id: z.string().uuid(),
    text: z.string(),
    status: z.string(),
    createdAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime()),
    updatedAt: z.preprocess((val: any) => new Date(val).toISOString(), z.string().datetime())

  }))

export type TodoModel = z.TypeOf<typeof todoSchema>

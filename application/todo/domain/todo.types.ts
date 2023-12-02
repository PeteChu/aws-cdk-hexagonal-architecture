import { z } from "zod"
import { TodoStatus } from "./todo.entity"

export const CreateTodoInputProps = z.object({
  text: z.string()
})
export type CreateTodoProps = z.infer<typeof CreateTodoInputProps>


export const GetTodoInputProps = z.object({
  id: z.string().uuid(),
  text: z.string(),
  status: z.nativeEnum(TodoStatus)
}).partial()
export type GetTodoProps = z.infer<typeof GetTodoInputProps>


export interface UpdateTodoProps extends CreateTodoProps {
  status: TodoStatus
}

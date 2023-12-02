import { z } from "zod"
import { TodoStatus } from "./todo.entity"

export const CreateTodoInputProps = z.object({
  text: z.string()
})

export type CreateTodoProps = z.infer<typeof CreateTodoInputProps>

// export interface CreateTodoProps {
//   text: string
// }

export interface UpdateTodoProps extends CreateTodoProps {
  status: TodoStatus
}

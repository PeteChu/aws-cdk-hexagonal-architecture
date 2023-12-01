import { TodoStatus } from "./todo.entity"

export interface CreateTodoProps {
  text: string
}

export interface UpdateTodoProps extends CreateTodoProps {
  status: TodoStatus
}

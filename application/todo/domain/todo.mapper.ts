import { Mapper } from "@app/libs/ddd/mapper.interface";
import { TodoEntity, TodoStatus } from "./todo.entity";
import { TodoResponseDto } from "../dtos/todo.response.dto";
import { TodoModel, todoSchema } from "./todo.model";

export class TodoMapper implements Mapper<TodoEntity, TodoModel, TodoResponseDto>  {

  toPersistence(entity: TodoEntity): TodoModel {
    const copy = entity.getProps()
    const record: TodoModel = {
      ...copy
    }
    return todoSchema.parse(record)
  }

  toDomain(record: TodoModel): TodoEntity {
    const entity = new TodoEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        text: record.text,
        status: record.status as TodoStatus
      }
    })
    return entity
  }

  toResponse(entity: TodoEntity): TodoResponseDto {
    const props = entity.getProps()
    const response = new TodoResponseDto(entity)
    response.text = props.text
    response.status = props.status
    return response
  }

}

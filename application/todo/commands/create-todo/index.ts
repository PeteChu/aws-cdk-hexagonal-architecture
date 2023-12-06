import "reflect-metadata";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { CreateTodoService } from "./services/create-todo.service";
import { ApiErrorResponse } from "@app/libs/api/api-error.response";
import { ExceptionBase } from "@app/libs/exceptions/exception.base";
import { CreateTodoProps } from "@app/todo/domain/todo.types";
import * as dotenv from "dotenv";
import { TodoMongoDBRepository } from "@app/todo/repositories/todo.mongodb.repository";
import { TodoDDBRepository } from "@app/todo/repositories/todo.ddb.repository";

dotenv.config();

export const handler = async (
  event: APIGatewayEvent,
  context?: Context,
): Promise<APIGatewayProxyResult> => {
  const tableName = process.env.DYNAMODB_TABLE_NAME ?? "";

  // const repo = new TodoDDBRepository(tableName);
  const repo = new TodoMongoDBRepository("todo", "todos");
  const service = new CreateTodoService(repo);

  const payload = JSON.parse(event.body ?? "") as CreateTodoProps;

  const response = await service.createTodo(payload);

  if (!response.ok) {
    return new ApiErrorResponse(response.error as ExceptionBase);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response.value.getProps(),
    }),
  };
};

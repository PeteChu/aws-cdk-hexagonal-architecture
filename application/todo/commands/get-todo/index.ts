import { ApiErrorResponse } from "@app/libs/api/api-error.response";
import { ExceptionBase } from "@app/libs/exceptions/exception.base";
import { TodoDDBRepository } from "@app/todo/repositories/todo.ddb.repository";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { GetTodoService } from "./services/get-todo.service";

dotenv.config();

const tableName = process.env.DYNAMODB_TABLE_NAME ?? "";
const repository = new TodoDDBRepository(tableName);

export const handler = async (
  event: APIGatewayProxyEvent,
  context?: Context,
): Promise<APIGatewayProxyResult> => {
  const service = new GetTodoService(repository);

  const payload =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const response = await service.getTodo(payload);
  if (!response.ok) {
    return new ApiErrorResponse(response.error as ExceptionBase);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        result: response.value,
      },
    }),
  };
};

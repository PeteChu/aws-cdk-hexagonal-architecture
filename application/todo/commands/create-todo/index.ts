import "reflect-metadata";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { CreateTodoService } from "./services/create-todo.service";
import { TodoDDBRepository } from "../../repositories/todo.ddb.repository";
import { ApiErrorResponse } from "@app/libs/api/api-error.response";
import { ExceptionBase } from "@app/libs/exceptions/exception.base";
import * as dotenv from "dotenv";

dotenv.config();

const tableName = process.env.DYNAMODB_TABLE_NAME ?? "";
const repository = new TodoDDBRepository(tableName);

export const handler = async (
  event: APIGatewayEvent,
  context?: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const service = new CreateTodoService(repository);

  const payload =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

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

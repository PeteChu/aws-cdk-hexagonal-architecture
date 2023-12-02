import "reflect-metadata";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { TodoDDBRepository } from "@app/todo/repositories/todo.ddb.repository";
import { ApiErrorResponse } from "@app/libs/api/api-error.response";
import { ExceptionBase } from "@app/libs/exceptions/exception.base";
import { GetTodoService } from "./services/get-todo.service";

export const handler = async (event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult> => {

  const tableName = process.env.DYNAMODB_TABLE_NAME ?? ''

  const repository = new TodoDDBRepository(tableName)
  const service = new GetTodoService(repository)

  const input = JSON.parse(event.body ?? '')

  const response = await service.getTodo(input)
  if (!response.ok) {
    return new ApiErrorResponse(response.error as ExceptionBase)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        result: response.value
      }
    })
  }
}

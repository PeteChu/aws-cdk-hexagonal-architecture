import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { TodoModel } from './entities/todo.entity';
import { DynamoDBRepository } from './repositories/dynamodb.repository.port';
import { CreateTodoService } from './services/create-todo.service';
import { BadRequestErrorException, InternalServerErrorException } from '@app/libs/exceptions/exceptions';

export const handler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {

  const tableName = process.env.DYNAMODB_TABLE_NAME ?? ''

  const repo = new DynamoDBRepository(tableName)
  const service = new CreateTodoService(repo)

  const payload = JSON.parse(event.body ?? '') as TodoModel

  const response = await service.createTodo(payload)

  if (!response.ok) {
    if (response.error instanceof BadRequestErrorException) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: {
            code: response.error.code,
            message: response.error.message
          }
        }),
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: {
          code: InternalServerErrorException.message,
        }
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response.value
    }),
  }
};

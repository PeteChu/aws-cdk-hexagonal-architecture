import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { CreateTodoProps } from './entities/todo.entity';
import { CreateTodoService } from './services/create-todo.service';
import { BadRequestErrorException, InternalServerErrorException } from '@app/libs/exceptions/exceptions';
import { TodoDDBRepository } from '../repositories/todo.ddb.repository';

export const handler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {

  const tableName = process.env.DYNAMODB_TABLE_NAME ?? ''

  const repo = new TodoDDBRepository(tableName)
  const service = new CreateTodoService(repo)

  const payload = JSON.parse(event.body ?? '') as CreateTodoProps

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
      message: response.value.getProps()
    }),
  }
};

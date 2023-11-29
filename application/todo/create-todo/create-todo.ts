import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { TodoModel } from './entities/todo.entity';
import { DynamoDBRepository } from './repositories/dynamodb.repository.port';
import { CreateTodoService } from './services/create-todo.service';

export const handler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {

  const tableName = process.env.DYNAMODB_TABLE_NAME ?? ''

  const repo = new DynamoDBRepository(tableName)
  const service = new CreateTodoService(repo)

  const payload = JSON.parse(event.body ?? '') as TodoModel

  const response = await service.createTodo(payload)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response
    }),
  };
};

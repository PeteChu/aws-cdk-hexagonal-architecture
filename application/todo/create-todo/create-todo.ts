import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {

  const tableName = process.env.DYNAMODB_TABLE_NAME

  const id = event.pathParameters?.id

  const dynamoDB = new DynamoDBClient()
  const ddb = DynamoDBDocumentClient.from(dynamoDB)

  const param: PutCommandInput = {
    Item: {
      PK: id,
      SK: 'NAME#',
      data: 'buy milk'
    },
    TableName: tableName
  }

  console.log(param)

  await ddb.send(new PutCommand(param))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: param.Item,
    }),
  };
};

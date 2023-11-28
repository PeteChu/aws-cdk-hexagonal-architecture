import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

export const handler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {
  const dynamoDBTableName = process.env.DYNAMODB_TABLE_NAME;

  const id = event.pathParameters?.id;

  const dynamoDB = new DynamoDBClient({});
  const ddb = DynamoDBDocumentClient.from(dynamoDB)

  // Get the entry based on the id 
  let params = { Key: { 'PK': id, 'SK': 'NAME#' }, TableName: dynamoDBTableName };
  const data = await ddb.send(new GetCommand(params))

  if (!data.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: null
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: data,
    }),
  };
};

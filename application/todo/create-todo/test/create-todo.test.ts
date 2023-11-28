import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock'
import { handler } from '../create-todo';
import { eventJSON } from './events/valid-event';

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()

})

describe('lambda create-todo', () => {

  it('lambda create-todo should return 200', async () => {

    ddbMock.on(PutCommand).resolves({
      "Attributes": {
        PK: "asdf",
        SK: "NAME#",
        data: "buy milk"
      },
    })

    const result = await handler(eventJSON)
    const body = JSON.parse(result.body)

    console.log(body)

    expect(result.statusCode).toBe(200)
    expect(body).toMatchObject({
      message: {
        SK: "NAME#",
        data: "buy milk"
      }
    })

  })

})


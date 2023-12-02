import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock'
import { handler } from '../index';
import { eventJSON } from './events/valid-event';
import { TodoStatus } from '../../../domain/todo.entity';

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()
})

describe('lambda create-todo', () => {

  it('lambda create-todo should return 200', async () => {
    // Expect
    const mockOutputItem: Partial<PutCommandOutput> = {
      $metadata: {
        httpStatusCode: 200
      },
      Attributes: {
        Id: {
          'S': 'a2171ac8-9ad0-4a04-b265-6d7656fa4c94'
        },
        Text: {
          'S': 'Buy booze!!!'
        },
        Status: {
          'S': TodoStatus.IN_PROGRESS.toString()
        },
        CreatedAt: {
          'S': new Date().toISOString()
        },
        UpdatedAt: {
          'S': new Date().toISOString()
        }
      }
    }

    ddbMock.on(PutCommand).resolves(mockOutputItem)

    // Input
    eventJSON.body = JSON.stringify({
      text: 'Buy booze!!!'
    })

    // Invoke
    const result = await handler(eventJSON)

    // Validate
    expect(result.statusCode).toBe(200)
  })

  it("lambda create-todo should return 400", async () => {

    // Input
    eventJSON.body = JSON.stringify({
      message: 'Buy booze!!!',
    })

    const response = await handler(eventJSON);
    expect(response.statusCode).toBe(400)
  })


  it("shoud return 400 with message: 'property 'text' is required'", async () => {

    // Input
    eventJSON.body = JSON.stringify({
      message: 'Buy booze!!!',
    })

    const response = await handler(eventJSON);
    const body = JSON.parse(response.body)
    expect(response.statusCode).toBe(400)
    expect(body).toMatchObject({
      error: {
        message: "Input validation failed: property 'text' is required.",
      }
    })
  })

})


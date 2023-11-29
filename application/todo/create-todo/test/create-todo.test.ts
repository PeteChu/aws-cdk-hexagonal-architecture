import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock'
import { handler } from '../index';
import { eventJSON } from './events/valid-event';
import { TodoStatus } from '../entities/todo.entity';
import { BAD_REQUEST } from '@app/libs/exceptions/exception.codes';

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()
})

describe('lambda create-todo', () => {

  it('lambda create-todo should return 200', async () => {
    // Expect
    const mockOutputItem: Partial<PutCommandOutput> = {
      Attributes: {
        id: {
          'S': 'a2171ac8-9ad0-4a04-b265-6d7656fa4c94'
        },
        text: {
          'S': 'Buy booze!!!'
        },
        status: {
          'S': TodoStatus.IN_PROGRESS.toString()
        },
        createdAt: {
          'S': new Date().toISOString()
        },
        updatedAt: {
          'S': new Date().toISOString()
        }
      }
    }

    ddbMock.on(PutCommand).resolves(mockOutputItem)

    // Input
    eventJSON.body = JSON.stringify({
      text: 'Buy booze!!!'
    })

    // Test
    const result = await handler(eventJSON)
    const body = JSON.parse(result.body)

    // Validate
    expect(result.statusCode).toBe(200)
    expect(body).toMatchObject({
      message: {
        props: {
          "text": "Buy booze!!!",
          "status": TodoStatus.IN_PROGRESS.toString()
        }
      }
    })

  })

  it("lambda create-todo should return 400", async () => {

    // Expect
    const mockOutputItem = {
      error: {
        code: BAD_REQUEST,
        message: "property 'text' is required."
      }
    }

    // Input
    eventJSON.body = JSON.stringify({
      message: 'Buy booze!!!'
    })

    const response = await handler(eventJSON);
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)
    expect(body).toMatchObject({
      ...mockOutputItem
    })
  })

})


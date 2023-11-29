import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock'
import { handler } from '../create-todo';
import { eventJSON } from './events/valid-event';
import { TodoStatus } from '../entities/todo.entity';

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()

})

describe('lambda create-todo', () => {

  it('lambda create-todo should return 200', async () => {

    const mockOutputItem: Partial<PutCommandOutput> = {
      Attributes: {
        id: 'FSDFWFASDFGERSDFS',
        text: 'Buy booze!!!',
        status: TodoStatus.IN_PROGRESS.toString()
      }
    }

    ddbMock.on(PutCommand).resolves(mockOutputItem)

    eventJSON.body = JSON.stringify({
      text: 'Buy booze!!!'
    })

    const result = await handler(eventJSON)
    const body = JSON.parse(result.body)


    expect(result.statusCode).toBe(200)
    expect(body).toMatchObject({
      message: {
        text: 'Buy booze!!!',
        status: TodoStatus.IN_PROGRESS
      }
    })

  })

})


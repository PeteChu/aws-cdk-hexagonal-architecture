import { GetItemCommand, GetItemCommandOutput, ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb"
import { handler } from "../index"
import { eventJSON } from "./events/valid-event"
import { TodoStatus } from "@app/todo/domain/todo.entity"
import { mockClient } from "aws-sdk-client-mock"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()
})

describe('lambda get todos', () => {

  it('should return todo with todo "Buy milk!!!"', async () => {

    const mockOutputItem: GetItemCommandOutput = {
      $metadata: {
        httpStatusCode: 200
      },
      Item: {
        ID: {
          "S": "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
        },
        Text: {
          "S": "Buy milk!!!"
        },
        Status: {
          "S": TodoStatus.IN_PROGRESS
        },
        CreatedAt: {
          "S": new Date().toISOString()
        },
        UpdatedAt: {
          "S": new Date().toISOString()
        }
      }
    }

    ddbMock.on(GetItemCommand).resolves(mockOutputItem)

    eventJSON.body = JSON.stringify({
      id: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5"
    })

    const response = await handler(eventJSON)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body).toMatchObject({
      message: {
        result: [{
          id: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
          text: "Buy milk!!!",
          status: TodoStatus.IN_PROGRESS
        }]
      }
    })
  })

  it('should return todo with first 2 todos', async () => {

    const mockOutputItem: ScanCommandOutput = {
      $metadata: {
        httpStatusCode: 200
      },
      Items: [{
        Id: {
          "S": "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
        },
        Text: {
          "S": "Buy milk!!!"
        },
        Status: {
          "S": TodoStatus.IN_PROGRESS
        },
        CreatedAt: {
          "S": new Date().toISOString()
        },
        UpdatedAt: {
          "S": new Date().toISOString()
        }
      },
      {
        Id: {
          "S": "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
        },
        Text: {
          "S": "Buy booze!!!!!"
        },
        Status: {
          "S": TodoStatus.COMPLETED
        },
        CreatedAt: {
          "S": new Date().toISOString()
        },
        UpdatedAt: {
          "S": new Date().toISOString()
        }
      }]
    }

    ddbMock.on(ScanCommand).resolves(mockOutputItem)

    eventJSON.body = JSON.stringify({})

    const response = await handler(eventJSON)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body).toMatchObject({
      message: {
        result: [{
          text: "Buy milk!!!",
          status: TodoStatus.IN_PROGRESS
        },
        {
          text: "Buy booze!!!!!",
          status: TodoStatus.COMPLETED
        }]
      }
    })
  })

  it("should return 400", async () => {

    eventJSON.body = JSON.stringify({
      id: 1 // should be uuid string
    })

    const response = await handler(eventJSON)

    expect(response.statusCode).toBe(400)
  })
})

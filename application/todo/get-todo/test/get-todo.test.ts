import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb"
import { handler } from "../get-doto"
import { eventJSON } from "./events/valid-event"

import { mockClient } from 'aws-sdk-client-mock'

const ddbMock = mockClient(DynamoDBDocumentClient)

beforeEach(() => {
  ddbMock.reset()
})

describe("lambda get-todo", () => {

  test('lambda function should return 200', async () => {
    process.env.DYNAMO_TABLE_NAME = 'unit_test_dynamodb_table'

    ddbMock.on(GetCommand).resolves({
      "Item": { "PK": "1", "SK": "NAME#" }
    })

    const result = await handler(eventJSON)
    const body = JSON.parse(result.body)

    expect(result.statusCode).toEqual(200);
    expect(body).toMatchObject({
      message: {
        Item: {
          PK: "1",
          SK: "NAME#"
        }
      }
    });
  })

  test('lambda function should return 404', async () => {
    process.env.DYNAMO_TABLE_NAME = 'unit_test_dynamodb_table'

    ddbMock.on(GetCommand).resolves({
      "Item": undefined
    })

    const result = await handler(eventJSON)
    const body = JSON.parse(result.body)

    expect(result.statusCode).toEqual(404)
    expect(body).toMatchObject({
      message: null
    })
  })

})


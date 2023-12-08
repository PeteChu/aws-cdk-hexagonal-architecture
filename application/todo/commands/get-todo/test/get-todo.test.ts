import { TodoStatus } from "@app/todo/domain/todo.entity";
import {
  QueryCommand,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { handler } from "../index";
import { eventJSON } from "./events/valid-event";
import { marshall } from "@aws-sdk/util-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("lambda get todos", () => {
  it('should return todo with todo "Buy milk!!!"', async () => {
    const mockOutputItem: QueryCommandOutput = {
      $metadata: {
        httpStatusCode: 200,
      },
      Items: [
        marshall({
          id: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
          text: "Buy milk!!!",
          status: TodoStatus.IN_PROGRESS,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      ],
    };

    ddbMock.on(QueryCommand).resolves(mockOutputItem);

    eventJSON.body = JSON.stringify({
      id: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
    });

    const response = await handler(eventJSON);
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      message: {
        result: [
          {
            id: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
            text: "Buy milk!!!",
            status: TodoStatus.IN_PROGRESS,
          },
        ],
      },
    });
  });

  it("should return todo with first 2 todos", async () => {
    const mockOutputItem: ScanCommandOutput = {
      $metadata: {
        httpStatusCode: 200,
      },
      Items: [
        {
          id: {
            S: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
          },
          text: {
            S: "Buy milk!!!",
          },
          status: {
            S: TodoStatus.IN_PROGRESS,
          },
          createdAt: {
            S: new Date().toISOString(),
          },
          updatedAt: {
            S: new Date().toISOString(),
          },
        },
        {
          id: {
            S: "2a4f8883-675b-4c03-8fca-ae8cf5ee2ce5",
          },
          text: {
            S: "Buy booze!!!!!",
          },
          status: {
            S: TodoStatus.COMPLETED,
          },
          createdAt: {
            S: new Date().toISOString(),
          },
          updatedAt: {
            S: new Date().toISOString(),
          },
        },
      ],
    };

    ddbMock.on(ScanCommand).resolves(mockOutputItem);

    eventJSON.body = JSON.stringify({});

    const response = await handler(eventJSON);
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      message: {
        result: [
          {
            text: "Buy milk!!!",
            status: TodoStatus.IN_PROGRESS,
          },
          {
            text: "Buy booze!!!!!",
            status: TodoStatus.COMPLETED,
          },
        ],
      },
    });
  });

  it("should return 400", async () => {
    eventJSON.body = JSON.stringify({
      id: 1, // should be uuid string
    });

    const response = await handler(eventJSON);

    expect(response.statusCode).toBe(400);
  });
});

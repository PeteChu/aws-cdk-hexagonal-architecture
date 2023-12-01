import { APIGatewayProxyResult } from "aws-lambda";
import { ExceptionBase } from "../exceptions/exception.base";

export class ApiErrorResponse implements APIGatewayProxyResult {

  readonly statusCode: number;
  readonly body: string;
  readonly code: string

  constructor(body: ExceptionBase) {
    this.statusCode = body.statusCode
    this.body = JSON.stringify({
      error: {
        code: body.code,
        message: body.message,
      }
    })
  }
}

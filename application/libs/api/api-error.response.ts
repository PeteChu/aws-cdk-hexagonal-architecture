export class ApiErrorResponse {

  readonly statusCode: number;

  readonly message: string;

  readonly error: string;

  constructor(body: ApiErrorResponse) {
    this.statusCode = body.statusCode
    this.message = body.message
    this.error = body.error
  }

}

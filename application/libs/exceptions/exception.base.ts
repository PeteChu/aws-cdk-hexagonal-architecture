export interface SerializedException {
  message: string;
  code: string;
  statusCode: number
  stack?: string;
  cause?: string;
}

export abstract class ExceptionBase extends Error {
  abstract code: string
  abstract statusCode: number

  constructor(readonly message: string, readonly cause?: Error) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
    };
  }

}

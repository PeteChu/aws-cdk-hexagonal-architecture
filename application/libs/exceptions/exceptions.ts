import { ExceptionBase } from "./exception.base";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "./exception.codes";


export class BadRequestErrorException extends ExceptionBase {
  static readonly message = 'Bad request'

  constructor(message = BadRequestErrorException.message) {
    super(message)
  }

  readonly code = BAD_REQUEST;
}

export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
}

import { ExceptionBase } from "./exception.base";
import { BAD_REQUEST, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "./exception.codes";

export class BadRequestException extends ExceptionBase {
  static readonly message = 'Bad request'

  constructor(message = BadRequestException.message) {
    super(message)
  }

  readonly code = BAD_REQUEST;
  readonly statusCode = 400
}

export class UnauthorizedException extends ExceptionBase {
  static readonly message = 'Unauthorized'

  constructor(message = UnauthorizedException.message) {
    super(message)
  }

  readonly code: string = UNAUTHORIZED
  readonly statusCode: number = 401
}

export class ForbiddenException extends ExceptionBase {
  static readonly message = 'Forbidden'

  constructor(message = ForbiddenException.message) {
    super(message)
  }

  readonly code: string = FORBIDDEN
  readonly statusCode: number = 403
}

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found'

  constructor(message = NotFoundException.message) {
    super(message)
  }

  readonly code = NOT_FOUND;
  readonly statusCode = 404
}

export class Conflict extends ExceptionBase {
  static readonly message = 'Conflict'

  constructor(message = ForbiddenException.message) {
    super(message)
  }

  readonly code: string = CONFLICT
  readonly statusCode: number = 409
}

export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
  readonly statusCode = 500
}

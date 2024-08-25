import { HttpException, HttpStatus } from '@nestjs/common';
import { TBaseResponse } from '../types/base-response.type';

export class BaseResponseException<T, E = unknown> extends HttpException {
  constructor(errors: string[], statusCode: HttpStatus, data?: T, error?: E) {
    const response: TBaseResponse<T, E> = {
      success: false,
      errors,
      statusCode,
      data,
      error,
    };
    super(response, statusCode);
  }
}

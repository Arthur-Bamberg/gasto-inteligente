import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponseException } from '../exceptions/base-response.exception';
import { TBaseResponse } from '../types/base-response.type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let errors: string[] = [];

    if (exception instanceof BaseResponseException) {
      const baseResponse = exceptionResponse as TBaseResponse<unknown>;
      response.status(status).json(baseResponse);
      return;
    }

    if (typeof exceptionResponse === 'string') {
      errors = [exceptionResponse];
    } else if (exceptionResponse instanceof Object) {
      const { message } = exceptionResponse as Record<string, unknown>;
      errors = Array.isArray(message) ? message : [message];
    }

    const errorResponse: TBaseResponse<unknown> = {
      success: false,
      errors,
      statusCode: status,
    };

    response.status(status).json(errorResponse);
  }
}

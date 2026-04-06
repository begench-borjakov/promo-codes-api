import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Internal server error';

    const errorCodeMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.TOO_MANY_REQUESTS]: 'TOO_MANY_REQUESTS',
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      code = errorCodeMap[statusCode] ?? 'HTTP_EXCEPTION';

      const body = exception.getResponse();

      if (typeof body === 'string') {
        message = body;
      } else if (body && typeof body === 'object') {
        const maybe = body as Record<string, unknown>;
        const msg = maybe.message;

        if (typeof msg === 'string') {
          message = msg;
        } else if (Array.isArray(msg) && msg.length > 0) {
          message = msg
            .filter((item): item is string => typeof item === 'string')
            .join(', ');
        } else if (typeof exception.message === 'string' && exception.message) {
          message = exception.message;
        }
      }
    } else if (exception instanceof Error && exception.message) {
      message = exception.message;
    }

    response.status(statusCode).json({
      statusCode,
      code,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

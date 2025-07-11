/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:34:34
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-04 09:54:35
 * @FilePath: \nest-demo1\src\app.filter.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INTERNAL_SERVER_ERROR } from './utils/globalMessage';

/**
 * 全局异常过滤器
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      message:
        exception instanceof HttpException
          ? exception.message
          : INTERNAL_SERVER_ERROR,
      code:
        Number(status) === (HttpStatus.NOT_FOUND as number)
          ? 404
          : Number(status),
    });
  }
}
/**
 * 全局正常过滤器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: object) => ({
        code: 200,
        data: data || {},
      })),
    );
  }
}

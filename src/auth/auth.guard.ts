/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-17 09:54:40
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 11:36:43
 * @FilePath: \nest-demo1\src\auth\auth.guard.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { useLogger } from 'src/utils/logger';
import { TOKEN_ERROR } from 'src/utils/globalMessage';
import { Request } from 'express';
import { AuthenticatedRequest } from './AuthenticatedRequest';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      useLogger.printLog('No token provided', null, 'JwtAuthGuard', 'warn');
      throw new UnauthorizedException(TOKEN_ERROR);
    }

    try {
      // 使用 await 确保异步操作完成
      const payload = this.authService.decodeToken(token);

      // 添加类型断言确保类型安全
      (request as unknown as AuthenticatedRequest).user = payload;
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      useLogger.printLog(
        'Invalid token',
        errorMessage,
        'JwtAuthGuard',
        'error',
      );
      throw new UnauthorizedException(TOKEN_ERROR);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (typeof authHeader !== 'string') return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

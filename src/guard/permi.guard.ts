/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-21 11:49:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 14:15:52
 * @FilePath: \nest-demo1\src\guard\permi.guard.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/has-permi.decorator';
import { AuthenticatedRequest } from '../auth/AuthenticatedRequest'; // 扩展的 Request 类型
import { AuthService } from 'src/auth/auth.service';
import { NO_PERMISSION } from 'src/utils/globalMessage';
import { useLogger } from 'src/utils/logger';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // 用于读取元数据
    private authService: AuthService, // 用于查询用户权限
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取 @hasPermi 设置的权限要求
    const requiredPermissions = this.reflector.get<string[] | string>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    useLogger.printLog('come to hasPermi guard');

    // 2. 如果没有设置权限要求，直接放行
    if (!requiredPermissions) {
      return true;
    }

    // 3. 获取请求对象（包含 JWT 解析后的用户信息）
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userId = request.user.id; // 假设 JWT 解析后包含用户 ID

    if (!(await this.authService.validPermi(userId, requiredPermissions))) {
      throw new ForbiddenException(NO_PERMISSION);
    }

    return true;
  }
}

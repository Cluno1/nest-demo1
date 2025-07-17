/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-16 18:19:38
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 11:37:24
 * @FilePath: \nest-demo1\src\menu\menu.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { AuthService } from './../auth/auth.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { useLogger } from 'src/utils/logger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/auth/AuthenticatedRequest';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly authService: AuthService,
  ) {}

  @Get('async_menu')
  async getAllUsers(@Request() req: AuthenticatedRequest) {
    useLogger.controllerLog('menu', 'getAllUsers');
    // 直接从请求对象的 user 属性中获取解析后的 payload
    const { id } = req.user;
    return await this.menuService.getAsyncMenu(id);
  }
}

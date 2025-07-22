/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:50:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 22:48:31
 * @FilePath: \nest-demo1\src\user\user.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

import { Controller, Body, Get, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { useLogger } from 'src/utils/logger';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { hasPermi } from 'src/decorators/has-permi.decorator';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @hasPermi('system:user:list')
  @Get('all')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    useLogger.printLog('/user/all', 'controller层', 'getAllUsers');
    return await this.userService.findAllUsers(page, limit);
  }

  @Post('')
}

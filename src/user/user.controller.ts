/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:50:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 11:02:13
 * @FilePath: \nest-demo1\src\user\user.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

import {
  Controller,
  Body,
  Get,
  UseGuards,
  Query,
  Post,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { useLogger } from 'src/utils/logger';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { hasPermi } from 'src/decorators/has-permi.decorator';
import { UpdateUser } from './dto/updateUser.dto';
import { AuthenticatedRequest } from 'src/auth/AuthenticatedRequest';
import { NO_PERMISSION } from 'src/utils/globalMessage';

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

  /**
   * 必须要有account
   * @param user
   * @returns
   */
  @Post('updateByPermi')
  @hasPermi('system:user:update')
  async updateByPermi(@Body() user: UpdateUser) {
    useLogger.controllerLog('updateByPermi', 'updateByPermi', user);
    return await this.userService.updateUser(user);
  }
  @Post('update')
  async update(@Body() user: UpdateUser, @Request() req: AuthenticatedRequest) {
    if (
      req.user.account !== user.account ||
      user.rolesCode ||
      user.uniPermissions
    ) {
      throw new ForbiddenException(NO_PERMISSION);
    }

    useLogger.controllerLog('update', 'update', user);
    return await this.userService.updateUser(user);
  }
}

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:53:02
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 17:08:18
 * @FilePath: \nest-demo1\src\auth\auth.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { useLogger } from 'src/utils/logger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.account,
      loginDto.password,
    );
    useLogger.printLog('user', user);
    return user;
  }
}

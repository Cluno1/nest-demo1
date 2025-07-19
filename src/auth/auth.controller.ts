/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:53:02
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 16:48:22
 * @FilePath: \nest-demo1\src\auth\auth.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { useLogger } from 'src/utils/logger';
import { RegisterDto } from './dto/register.dto';

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
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const newUser = await this.authService.register(registerDto);
    useLogger.printLog('newUser', newUser);
    return newUser;
  }
  @Post('refresh-token')
  refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }
  @Post('logout')
  logout(@Body() Body: { id: number }) {
    return this.authService.logout(Body.id);
  }
}

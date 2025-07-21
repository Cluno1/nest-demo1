/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:50:10
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 14:39:10
 * @FilePath: \nest-demo1\src\auth\auth.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entity/permission.entity';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SECRET_PWD, TOKEN_TIME } from 'src/utils/bcrypt';
import { JwtAuthGuard } from '../guard/auth.guard';
import { UserModule } from 'src/user/user.module';
import { PermissionGuard } from 'src/guard/permi.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    JwtModule.register({
      secret: SECRET_PWD, // 替换成你的密钥
      signOptions: { expiresIn: TOKEN_TIME }, // Token 有效期
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, UserService, JwtAuthGuard, PermissionGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}

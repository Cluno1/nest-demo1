/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:47:48
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 11:17:40
 * @FilePath: \nest-demo1\src\user\user.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

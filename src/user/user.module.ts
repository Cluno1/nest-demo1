/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:47:48
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-22 23:51:42
 * @FilePath: \nest-demo1\src\user\user.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Permission } from 'src/entity/permission.entity';
import { Role } from 'src/entity/role.entity';
import { Menu } from 'src/entity/menu.entity';
import { MenuRole } from 'src/entity/menuRole.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Role, Menu, MenuRole]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 关键：导出 UserService
})
export class UserModule {}

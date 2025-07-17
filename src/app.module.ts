/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-06-27 16:32:57
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-16 18:51:33
 * @FilePath: \nest-demo1\src\app.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AllExceptionsFilter, TransformInterceptor } from './app.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { User } from './entity/user.entity';
import { EventData } from './entity/eventData.entity';
import { EventTypes } from './entity/eventType.entity';
import { EventUser } from './entity/eventUser.entity';
import { Permission } from './entity/permission.entity';
import { Role } from './entity/role.entity';
import { Menu } from './entity/menu.entity';
import { MenuRole } from './entity/menuRole.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 数据库主机
      port: 3306, // 默认 MySQL 端口
      username: 'root', // 数据库用户名
      password: '123123', // 数据库密码
      database: 'event', // 数据库名称
      entities: [
        User,
        EventData,
        EventTypes,
        EventUser,
        Permission,
        Role,
        Menu,
        MenuRole,
      ], // 实体类将在这里定义
      synchronize: true, // 生产环境请设置为 false
    }),
    UserModule,
    AuthModule,
    MenuModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}

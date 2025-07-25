/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-16 18:20:03
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 09:45:38
 * @FilePath: \nest-demo1\src\menu\menu.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entity/menu.entity';
import { MenuRole } from 'src/entity/menuRole.entity';
import { Role } from 'src/entity/role.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_PWD, TOKEN_TIME } from 'src/utils/bcrypt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Menu, MenuRole, User]),
    JwtModule.register({
      secret: SECRET_PWD, // 替换成你的密钥
      signOptions: { expiresIn: TOKEN_TIME }, // Token 有效期
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:50:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-02 17:16:54
 * @FilePath: \nest-demo1\src\user\user.controller.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}

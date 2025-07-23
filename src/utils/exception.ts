/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-23 11:29:04
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 11:31:31
 * @FilePath: \nest-demo1\src\utils\exception.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { NotFoundException } from '@nestjs/common';
import { INVALID_USER } from './globalMessage';

export const NotFoundUser = () => {
  return new NotFoundException(INVALID_USER);
};

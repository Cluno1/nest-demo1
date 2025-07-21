/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-21 11:23:30
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 13:52:13
 * @FilePath: \nest-demo1\src\decorators\has-permi.decorator.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/openapi/decorators#decorators
*/
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'required_permissions'; // 元数据的 key
export const hasPermi = (permissions: string[] | string) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

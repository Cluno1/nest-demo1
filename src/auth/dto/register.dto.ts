/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-14 11:19:24
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-14 11:48:29
 * @FilePath: \nest-demo1\src\auth\dto\register.dto.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  account!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  name?: string;
}

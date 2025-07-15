/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-15 17:01:28
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 17:14:21
 * @FilePath: \nest-demo1\src\utils\user\userUtil.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { User } from 'src/entity/user.entity';
import { ReturnUserDto } from 'src/user/dto/returnUser.dto';

export function getReturnUser(user: User): ReturnUserDto {
  return {
    id: user.id,
    avatar: user.avatar,
    account: user.account,
    name: user.name,
    roles: user.roles?.map((_) => _?.code) as string[],
    permissions: user.permissions?.map((up) => up.permission?.name) as string[], // 提取权限名称
  };
}

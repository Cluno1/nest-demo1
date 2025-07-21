/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-15 17:01:28
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 13:41:59
 * @FilePath: \nest-demo1\src\utils\user\userUtil.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { User } from 'src/entity/user.entity';
import { ReturnUserDto } from 'src/user/dto/returnUser.dto';

export function getReturnUser(user: User): ReturnUserDto {
  user.password = '';
  return {
    ...user,
    roles: user.roles?.map((_) => _?.code) as string[],
    permissions: user.permissions?.map((up) => up.name) as string[], // 提取权限名称
  };
}

export function getFUllReturnUser(user: User): ReturnUserDto {
  user.password = '';
  const perms = [] as string[];

  user?.permissions?.map((up) => {
    if (up.name) perms.push(up.name);
  });
  const uniPerm = [...perms];

  user?.roles?.map((role) => {
    role?.permissions?.map((up) => {
      if (up.name) perms.push(up.name);
    });
  });
  const mRole = [] as string[];
  user?.roles?.map((r) => {
    r?.menuRoles?.map((m) => {
      if (m.name) mRole.push(m.name);
    });
  });
  const role = [] as string[];
  user?.roles?.map((r) => {
    if (r.code) role.push(r.code);
  });
  return {
    ...user,
    permissions: perms,
    uniPermissions: uniPerm,
    menuRoles: mRole,
    roles: role,
  };
}

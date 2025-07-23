/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-15 17:04:11
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 15:02:04
 * @FilePath: \nest-demo1\src\user\dto\returnUser.dto.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
export class ReturnUserDto {
  id?: number;
  avatar?: string;
  account?: string;
  name?: string;
  /**
   * 权限角色
   */
  roles?: string[];
  /**
   * 所有权限 (独有权限+权限角色的权限)
   */
  permissions?: string[];
  /**
   * 该角色独有权限
   */
  uniPermissions?: string[];
  /**
   * 菜单角色
   */
  menuRoles?: string[];
  createTime?: Date | string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 禁用
   */
  disable?: number;
  /**
   * 是否逻辑删除
   */
  isDDlete?: number;
  deleteTime?: Date | string;
  /**
   * 让token失效
   */
  tokenVersion?: number;
}

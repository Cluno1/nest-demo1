/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:26:35
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:18:19
 * @FilePath: \nest-demo1\src\entity\user-permission.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('user_permission')
export class UserPermission {
  @PrimaryColumn()
  user_id?: number;

  @PrimaryColumn()
  permission_id?: number;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Permission, (permission) => permission.userPermissions)
  @JoinColumn({ name: 'permission_id' })
  permission?: Permission;
}

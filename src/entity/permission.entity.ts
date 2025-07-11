/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:24:55
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:18:37
 * @FilePath: \nest-demo1\src\entity\permission.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPermission } from './user-permission.entity';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', unique: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission,
  )
  userPermissions?: UserPermission[];
}

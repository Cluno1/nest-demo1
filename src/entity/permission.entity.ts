/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:24:55
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-16 17:21:12
 * @FilePath: \nest-demo1\src\entity\permission.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id?: number;
  /**
   * 这里的name就是 权限,如: *:*:*
   */
  @Column({ type: 'varchar', unique: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles?: Role[];

  @ManyToMany(() => User, (u) => u.permissions)
  users?: User[];
}

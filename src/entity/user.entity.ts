/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:53:51
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:17:54
 * @FilePath: \nest-demo1\src\entity\user.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserPermission } from './user-permission.entity';

@Entity('e_user')
export class User {
  @PrimaryGeneratedColumn({ comment: 'Primary Key' })
  id?: number;

  @CreateDateColumn({ name: 'create_time', comment: 'Create Time' })
  createTime?: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Login account',
  })
  account?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Password (should be encrypted)',
  })
  password?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'User name',
  })
  name?: string;

  @Column({ type: 'text', nullable: true, comment: 'Description' })
  description?: string;

  @Column({ type: 'tinyint', default: 1, comment: '1: active; 0: disabled' })
  disable?: number;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  permissions?: UserPermission[]; // 通过中间表关联
}

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:53:51
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 15:33:19
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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

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

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'Avatar URL',
  })
  avatar?: string;
  /**
   * 用户的描述 比如密码：123123
   */
  @Column({ type: 'text', nullable: true, comment: 'Description' })
  description?: string;
  /**
   * 是否禁用 0：禁；1：正常
   */
  @Column({ type: 'tinyint', default: 1, comment: '1: active; 0: disabled' })
  disable?: number;

  @Column({
    name: 'is_delete',
    type: 'tinyint',
    default: 0,
    comment: '1: 删除; 0: 没有被标记删除',
  })
  isDelete?: number;

  @Column({
    name: 'delete_time',
    nullable: true,
  })
  deleteTime?: Date;

  @Column({ name: 'token_version', default: 0 })
  tokenVersion: number = 0;

  @ManyToMany(() => Permission, (p) => p.users)
  @JoinTable({
    name: 'user_permission', // 使用现有表
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions?: Permission[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role', // 中间表名称
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[]; // 多对多角色关系
}

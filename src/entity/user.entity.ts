/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:53:51
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 16:24:29
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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserPermission } from './user-permission.entity';
import { Role } from './role.entity';

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

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  permissions?: UserPermission[]; // 通过中间表关联

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

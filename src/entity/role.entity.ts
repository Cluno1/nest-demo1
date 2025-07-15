/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-15 16:21:56
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 16:38:17
 * @FilePath: \nest-demo1\src\entity\role.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ comment: '角色ID' })
  id?: number;

  @Column({ type: 'varchar', length: 50, unique: true, comment: '角色名称' })
  name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '角色描述' })
  description?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '角色标识符',
  })
  code?: string;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permission', // 中间表名
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions?: Permission[];
}

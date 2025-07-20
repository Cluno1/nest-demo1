/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-16 16:33:48
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-19 11:51:54
 * @FilePath: \nest-demo1\src\entity\menuRole.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// menu_role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { Menu } from './menu.entity';

@Entity('menu_role')
export class MenuRole {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id?: number;

  @ManyToMany(() => Role, (role) => role.menuRoles)
  roles?: Role[];

  @ManyToMany(() => Menu, (menu) => menu.menuRoles)
  @JoinTable({
    name: 'menu_role_menu', // 中间表名
    joinColumn: { name: 'menu_role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
  })
  menus?: Menu[];

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '菜单权限角色',
  })
  name?: string;

  // 可以在这里添加额外的关联属性
  @Column({ type: 'tinyint', default: 1, comment: '是否拥有访问权限' })
  hasAccess?: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createdAt?: Date;
}

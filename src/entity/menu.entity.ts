/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-16 16:33:18
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 09:40:11
 * @FilePath: \nest-demo1\src\entity\menu.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// menu.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { MenuRole } from './menuRole.entity';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn({ comment: '菜单ID' })
  id!: number; // 主键肯定存在，用非空断言

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '菜单路径' })
  path: string | null = null; // 明确可为 null

  @Column({ type: 'varchar', length: 50, comment: '菜单名称' })
  title!: string; // 必填字段，用非空断言

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '菜单图标' })
  icon: string | null = null; // 明确可为 null

  @Column({ type: 'int', nullable: true, comment: '排序' })
  rank: number | null = null; // 明确可为 null

  @Column({ type: 'int', nullable: true, comment: '父菜单ID' })
  parentId: number | null = null; // 明确可为 null

  @ManyToMany(() => MenuRole, (menuRole) => menuRole.menus)
  menuRoles!: MenuRole[]; // 关系字段，用非空断言（初始化时可能为空数组）
}

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:56:24
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:18:55
 * @FilePath: \nest-demo1\src\entity\eventUser.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('event_user')
export class EventUser {
  @PrimaryGeneratedColumn({ comment: 'Primary Key' })
  id?: number;

  @CreateDateColumn({ name: 'create_time', comment: 'Create Time' })
  createTime?: Date;

  @Column({ name: 'e_user_id', nullable: false, comment: 'user表的id' })
  eUserId?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'e_user_id' })
  user?: User;

  @Column({ type: 'json', nullable: true, comment: '埋点参数 半结构化 json' })
  params?: any;

  @Column({ type: 'text', nullable: true, comment: '描述' })
  description?: string;

  @Column({ type: 'tinyint', default: 1, comment: '1: active; 0: disabled' })
  disable?: number;
}

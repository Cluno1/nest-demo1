/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:56:58
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:17:33
 * @FilePath: \nest-demo1\src\entity\eventType.entity.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('event_types')
export class EventTypes {
  @PrimaryGeneratedColumn({ comment: 'Primary Key' })
  id?: number;

  @CreateDateColumn({ name: 'create_time', comment: 'Create Time' })
  createTime?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '事件名称' })
  @Index('idx_name')
  name?: string;

  @Column({ type: 'text', nullable: true, comment: '描述' })
  description?: string;

  @CreateDateColumn({ name: 'updated_time', comment: '更新时间' })
  updatedTime?: Date;
}

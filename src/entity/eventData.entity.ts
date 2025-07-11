/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 15:57:15
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:14:53
 * @FilePath: \nest-demo1\src\entity\eventData.entity.ts
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
import { EventTypes } from './eventType.entity';
import { EventUser } from './eventUser.entity';

@Entity('event_data')
export class EventData {
  @PrimaryGeneratedColumn({ comment: 'Primary Key' })
  id?: number;

  @CreateDateColumn({ name: 'create_time', comment: 'Create Time' })
  createTime?: Date;

  @Column({ name: 'event_types_id', nullable: false, comment: '类型id' })
  eventTypesId?: number;

  @ManyToOne(() => EventTypes, { nullable: false })
  @JoinColumn({ name: 'event_types_id' })
  eventType?: EventTypes;

  @Column({ name: 'event_user_id', nullable: false, comment: 'user id' })
  eventUserId?: number;

  @ManyToOne(() => EventUser, { nullable: false })
  @JoinColumn({ name: 'event_user_id' })
  eventUser?: EventUser;

  @Column({ type: 'json', nullable: true, comment: '埋点参数 半结构化 json' })
  params?: any;

  @Column({ type: 'text', nullable: true, comment: '描述' })
  description?: string;
}

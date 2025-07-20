/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-19 14:32:31
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-19 15:06:26
 * @FilePath: \nest-demo1\src\redis\redis.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost', // Redis 服务器地址
        port: 6379, // Redis 端口
        ttl: 60 * 60, // 默认缓存过期时间(秒)
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService, CacheModule],
})
export class RedisModule {}

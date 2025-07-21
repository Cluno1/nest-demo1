/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-19 14:32:31
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 08:51:25
 * @FilePath: \nest-demo1\src\redis\redis.module.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const store = (await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        })) as unknown as CacheStorage; // 类型断言

        return {
          store: store,
          ttl: 60 * 60,
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}

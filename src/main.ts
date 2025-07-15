/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-06-27 16:32:57
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 11:54:52
 * @FilePath: \nest-demo1\src\main.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用 CORS
  app.enableCors({
    origin: 'http://localhost:8848',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'X-Requested-With', 'Content-Type'],
    credentials: true, // 如果需要传递 cookies
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

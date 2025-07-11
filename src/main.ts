/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-06-27 16:32:57
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:07:07
 * @FilePath: \nest-demo1\src\main.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

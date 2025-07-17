/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-17 11:27:12
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 11:35:12
 * @FilePath: \nest-demo1\src\auth\AuthenticatedRequest.d.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

import { Payload } from './dto/payload.dto';

export interface AuthenticatedRequest extends Request {
  user: Payload;
}

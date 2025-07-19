/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-17 16:04:57
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 16:06:47
 * @FilePath: \nest-demo1\src\auth\dto\rePayload.dto.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
export class RePayload {
  constructor(
    public id: number,
    public account: string,
    public isRefreshToken: boolean,
    public tokenVersion: number,
  ) {}
}

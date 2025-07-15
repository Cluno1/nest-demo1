/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-03 17:16:06
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-14 11:40:19
 * @FilePath: \nest-demo1\src\auth\dto\payload.dto.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/**
 * token里面的字段
 */
export class Payload {
  constructor(
    public id: number,
    public account: string,
  ) {}
  /**
   * 返回该类的对象
   * @returns
   */
  getPayloadObj() {
    return {
      id: this.id,
      account: this.account,
    };
  }
}

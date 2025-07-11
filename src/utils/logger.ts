/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-03 17:29:35
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-04 09:32:24
 * @FilePath: \nest-demo1\src\utils\logger.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
export class useLogger {
  /**
   * 打印日志
   * @param discrible
   * @param value
   * @param functionName
   * @param type
   * @returns
   */
  static printLog(
    discrible: string = '',
    value: any = '',
    functionName: string | string[] = '',
    type: 'log' | 'error' | 'warnning' = 'log',
  ): string {
    const timestamp = new Date().toISOString(); // 获取当前时间并格式化

    const prefix = `[${timestamp}] [${type.toUpperCase()}] [ fn : ${JSON.stringify(functionName)}] -- ${discrible} :`;

    switch (type) {
      case 'log':
        console.log(prefix, value);
        break;
      case 'error':
        console.error(prefix, value);
        break;
      case 'warnning':
        console.warn(prefix, value);
        break;
      default:
        console.log(prefix, value);
    }
    return `${prefix} ${JSON.stringify(value)}`;
  }
}

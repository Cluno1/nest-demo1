/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-17 16:29:36
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-18 11:21:24
 * @FilePath: \nest-demo1\src\auth\utils\getExpires.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */ import dayjs from 'dayjs';

/**
 * 计算 token 的过期时间（返回 yyyy/mm/dd hh:mm:ss 格式）
 * @param expiresIn 有效期，如 '5d'、'30d'、'2h','3m','30min','1y','30s'
 * @returns 格式化后的时间字符串，如 "2025/07/22 15:30:45"
 */
export function getTokenExpiresTime(expiresIn: string): string {
  const now = dayjs();
  const regex = /^(\d+)([smhd]|min|y)$/;
  const match = expiresIn.match(regex);

  if (!match) {
    throw new Error(`Invalid expiresIn format: ${expiresIn}`);
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  const unitMap: Record<string, dayjs.ManipulateType> = {
    s: 'second',
    min: 'minute',
    m: 'month',
    h: 'hour',
    d: 'day',
    y: 'year',
  };

  if (!(unit in unitMap)) {
    throw new Error(`Unsupported time unit: ${unit}`);
  }

  return now.add(value, unitMap[unit]).format('YYYY/MM/DD HH:mm:ss');
}

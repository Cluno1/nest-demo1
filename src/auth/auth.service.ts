/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:41:07
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 17:29:01
 * @FilePath: \nest-demo1\src\auth\auth.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:41:07
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-02 16:50:12
 * @FilePath: \nest-demo1\src\auth.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import {
  CATCH_ERROR,
  INVALID_USER,
  TOKEN_ERROR,
} from 'src/utils/globalMessage';
import { Payload } from './dto/payload.dto';
import { useLogger } from 'src/utils/logger';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  /**
   * 验证登录
   * @param account
   * @param password
   * @returns
   */
  async validateUser(account: string, password: string) {
    useLogger.printLog('account', account, 'validateUser', 'log');
    const user =
      await this.userService.findOneWithPermissionsByAccount(account);
    useLogger.printLog(
      'user',
      user,
      ['validateUser', 'this.userService.findOneByAccount'],
      'log',
    );
    if (!user) throw new UnauthorizedException(INVALID_USER);

    const isPasswordValid = await bcrypt.compare(password, user.password ?? '');
    useLogger.printLog('isPasswordValid', isPasswordValid, [
      'validateUser',
      'bcrypt.compare',
    ]);
    if (!isPasswordValid) throw new UnauthorizedException(INVALID_USER);
    useLogger.printLog('come1');

    try {
      const payload = new Payload(user.id ?? 0, user.account ?? '');
      useLogger.printLog('payload', payload);
      const token = this.jwtService.sign(payload.getPayloadObj());
      useLogger.printLog('come2');
      return {
        token,
        user: {
          id: user.id,
          account: user.account,
          name: user.name,
          permissions: user.permissions?.map((up) => up.permission?.name), // 提取权限名称
        },
      };
    } catch (error) {
      useLogger.printLog(CATCH_ERROR + 'token generation error', error);
      throw error;
    }
  }

  decodeToken(token: string) {
    try {
      const decoded = this.jwtService.verify<Payload>(token); // 验证并解析 token
      return decoded;
    } catch (err) {
      useLogger.printLog(
        CATCH_ERROR + TOKEN_ERROR,
        err,
        ['decodeToken', 'AuthService'],
        'error',
      );
      throw new UnauthorizedException(TOKEN_ERROR);
    }
  }
}

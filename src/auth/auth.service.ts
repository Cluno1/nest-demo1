/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:41:07
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-18 11:52:24
 * @FilePath: \nest-demo1\src\auth\auth.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import {
  ACCOUNT_EXIST,
  CATCH_ERROR,
  INVALID_USER,
  REFRESH_TOKEN_ERROR,
  TOKEN_ERROR,
} from 'src/utils/globalMessage';
import { Payload } from './dto/payload.dto';
import { useLogger } from 'src/utils/logger';
import { RegisterDto } from './dto/register.dto';
import { REFRESH_TOKEN_TIME, SALT_ROUNDS, TOKEN_TIME } from 'src/utils/bcrypt';
import { getReturnUser } from 'src/utils/user/userUtil';
import { RePayload } from './dto/rePayload.dto';
import { getTokenExpiresTime } from './utils/getExpires';

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
    try {
      const user =
        await this.userService.findOneWithPermissionsByAccount(account);
      useLogger.printLog(
        'user',
        user,
        ['validateUser', 'this.userService.findOneByAccount'],
        'log',
      );
      if (!user) throw new NotFoundException(INVALID_USER);

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password ?? '',
      );
      useLogger.printLog('isPasswordValid', isPasswordValid, [
        'validateUser',
        'bcrypt.compare',
      ]);
      if (!isPasswordValid) throw new NotFoundException(INVALID_USER);

      const payload = new Payload(user.id ?? 0, user.account ?? '');
      const accessToken = this.jwtService.sign(payload.getPayloadObj());

      // 生成 refreshToken，带有更长的有效期和特殊用途标记
      const refreshToken = this.jwtService.sign(
        {
          ...payload.getPayloadObj(),
          isRefreshToken: true, // 标记这是一个 refreshToken
          tokenVersion: user.tokenVersion || 0, // 用于失效旧 token
        },
        { expiresIn: REFRESH_TOKEN_TIME }, // refreshToken 有效期更长
      );

      return {
        accessToken,
        refreshToken,
        expiresIn: getTokenExpiresTime(TOKEN_TIME),
        user: getReturnUser(user),
      };
    } catch (err) {
      useLogger.serviceError(
        'validateUser',
        'findOneWithPermissionsByAccount',
        err as Error,
      );
      throw err;
    }
  }
  async register(registerDto: RegisterDto) {
    const { account, password, name } = registerDto;

    // 检查账号是否已存在
    const existingUser = await this.userService.findOneByAccount(account || '');
    if (existingUser) {
      throw new BadRequestException(ACCOUNT_EXIST);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      // 创建用户
      await this.userService.createUser({
        account,
        password: hashedPassword,
        name,
      });
      return {
        msg: '注册成功',
      };
    } catch (err) {
      useLogger.printLog(CATCH_ERROR + 'createUser', err, 'createUser');
      throw err;
    }
  }
  /**
   * 解密token
   * @param token
   * @returns
   */
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
  /**
   * 更新token
   * @param reToken
   */
  async refreshAccessToken(reToken: string) {
    try {
      const decoded = this.jwtService.verify<RePayload>(reToken); // 验证并解析 refresh token
      useLogger.serviceStart('refreshAccessToken', 'decoded:', decoded);
      if (decoded.isRefreshToken) {
        const usr = await this.userService.findOneWithPermissions(decoded.id);
        if (usr?.tokenVersion == decoded.tokenVersion) {
          const refreshedUser = await this.userService.revokeRefreshTokens(
            decoded.id,
          );

          const payload = new Payload(decoded.id, decoded.account);
          useLogger.printLog('refresh payload', payload);
          const accessToken = this.jwtService.sign(payload.getPayloadObj());

          // 生成 refreshToken，带有更长的有效期和特殊用途标记
          const refreshToken = this.jwtService.sign(
            {
              ...payload.getPayloadObj(),
              isRefreshToken: true, // 标记这是一个 refreshToken
              tokenVersion: refreshedUser?.tokenVersion || 0, // 用于失效旧 token
            },
            { expiresIn: REFRESH_TOKEN_TIME }, // refreshToken 有效期更长
          );

          return {
            accessToken,
            refreshToken,
            expiresIn: getTokenExpiresTime(TOKEN_TIME),
          };
        }
      }
      throw Error(REFRESH_TOKEN_ERROR);
    } catch (err) {
      useLogger.serviceError(
        CATCH_ERROR + REFRESH_TOKEN_ERROR,
        ['decodeToken', 'AuthService'].toString(),
        err as Error,
      );
      throw new NotFoundException(REFRESH_TOKEN_ERROR);
    }
  }
  async logout(userId: number) {
    await this.userService.revokeRefreshTokens(userId);
    return;
  }
}

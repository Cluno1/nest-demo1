/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:06:31
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-21 12:44:08
 * @FilePath: \nest-demo1\src\user\user.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/providers#services
*/
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { INVALID_USER } from 'src/utils/globalMessage';
import { useLogger } from 'src/utils/logger';
import { getFUllReturnUser } from 'src/utils/user/userUtil';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  /**
   * 没有权限，仅仅用户
   * @param account
   * @returns
   */
  async findOneByAccount(account: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { account } });
  }
  /**
   * 创建用户
   * @param userData
   * @returns
   */
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }
  /**
   * 返回用户+权限 通过id
   * @param userId
   * @returns
   */
  async findOneWithPermissions(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions', 'roles', 'roles.permissions'], // 加载关联权限
    });
    user?.roles?.map((role) => {
      if (role.permissions) user.permissions?.push(...role.permissions);
    });
    return user;
  }

  async getUserMenuById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.menuRoles.menus'], // 加载关联权限
    });
  }
  /**
   *  返回用户+权限 perm是该用户具有的所有 perm
   * @param account
   * @returns
   */
  async findOneWithPermissionsByAccount(account: string) {
    if (!account) {
      return null;
    }
    useLogger.serviceStart(
      '返回用户+权限',
      'findOneWithPermissionsByAccount',
      account,
    );
    const user = await this.userRepository.findOne({
      where: { account },
      relations: ['permissions', 'roles', 'roles.permissions'], // 加载关联权限
    });
    user?.roles?.map((role) => {
      if (role.permissions) user.permissions?.push(...role.permissions);
    });
    return user;
  }
  /**
   * 获取所有用户
   * @returns
   */
  async findAllUsers() {
    const users = await this.userRepository.find({
      relations: [
        'permissions',
        'roles',
        'roles.permissions',
        'roles.menuRoles',
      ],
    }); // 查询所有用户数据
    return users.map((_) => {
      return getFUllReturnUser(_);
    });
  }
  /**
   * 更新token 版本
   * @param userId
   */
  async revokeRefreshTokens(userId: number) {
    await this.userRepository.update(userId, {
      tokenVersion: () => 'tokenVersion + 1', // 递增 tokenVersion 使所有旧 token 失效
    });
    return await this.findOneWithPermissions(userId);
  }
  async validPermi(userId: number, permi: string | string[]) {
    if (!permi || permi.length === 0) return true;
    const user = await this.findOneWithPermissions(userId);
    if (!userId || !user) throw new BadRequestException(INVALID_USER);

    const userPermissions: string[] = [];
    user.permissions?.map((p) => {
      if (p?.name) userPermissions.push(p.name);
    });

    const checkSinglePermission = (
      requiredPerm: string,
      userPerms: string[],
    ) => {
      // Split permissions into parts
      const requiredParts = requiredPerm.split(':');

      return userPerms.some((userPerm) => {
        const userParts = userPerm.split(':');

        // Check if all parts match or user has wildcard
        for (
          let i = 0;
          i < Math.max(requiredParts.length, userParts.length);
          i++
        ) {
          const reqPart = requiredParts[i];
          const userPart = userParts[i];

          // If user part is undefined but we still have required parts, no match
          if (userPart === undefined && reqPart !== undefined) return false;

          // If user has * at any level, it matches everything below
          if (userPart === '*') return true;

          // If parts don't match and neither is *, no match
          if (reqPart !== userPart && userPart !== '*' && reqPart !== '*') {
            return false;
          }
        }

        return true;
      });
    };

    if (Array.isArray(permi)) {
      return permi.some((p) => checkSinglePermission(p, userPermissions));
    } else {
      return checkSinglePermission(permi, userPermissions);
    }
  }
}

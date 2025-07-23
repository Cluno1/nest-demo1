/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:06:31
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 11:31:25
 * @FilePath: \nest-demo1\src\user\user.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/providers#services
*/
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { INVALID_USER } from 'src/utils/globalMessage';
import { useLogger } from 'src/utils/logger';
import { getFUllReturnUser } from 'src/utils/user/userUtil';
import { Repository } from 'typeorm';
import { UpdateUser } from './dto/updateUser.dto';
import { Permission } from 'src/entity/permission.entity';
import { Role } from 'src/entity/role.entity';
import { NotFoundUser } from 'src/utils/exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  /**
   * 仅仅用户,包括多对多表,但是没有联级
   * @param account
   * @returns
   */
  async findOneByAccount(account: string | null): Promise<User | null> {
    if (!account) {
      throw new NotFoundException(INVALID_USER);
    }
    return this.userRepository.findOne({
      where: { account },
      relations: ['permissions', 'roles'],
    });
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
   *  返回用户+权限 perm是该用户具有的所有 perm role
   * @param account
   * @returns
   */
  async findOneWithPermissionsByAccount(account: string | null) {
    if (!account) {
      throw new NotFoundException(INVALID_USER);
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
   * 获取所有用户 (分页)
   * @param page 页码 (从1开始)
   * @param limit 每页数量
   * @returns 分页用户数据
   */
  async findAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // 计算跳过的记录数

    const [users, total] = await this.userRepository.findAndCount({
      relations: [
        'permissions',
        'roles',
        'roles.permissions',
        'roles.menuRoles',
      ],
      skip,
      take: limit,
    }); // 查询分页用户数据及总数

    return {
      users: users.map(getFUllReturnUser),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  /**
   * 更新用户信息
   * @param user 要更新的用户对象
   * @returns 更新后的用户信息
   */
  async updateUser(user: UpdateUser) {
    // First check if user exists
    const existingUser = await this.findOneByAccount(user.account);

    if (!existingUser) {
      throw NotFoundUser();
    }

    // Update basic fields
    const mergedUser = this.userRepository.merge(existingUser, user);
    await this.userRepository.save(mergedUser);

    // Handle relations
    if (user.uniPermissions) {
      let permissions = [] as Permission[];
      if (user.uniPermissions.length > 0) {
        permissions = await this.permissionRepository.find({
          where: user.uniPermissions.map((name) => ({ name })),
        });
      }
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'permissions')
        .of(existingUser)
        .addAndRemove(permissions, existingUser.permissions);
    }

    if (user.rolesCode) {
      let roles = [] as Role[];
      if (user.rolesCode.length > 0) {
        roles = await this.roleRepository.find({
          where: user.rolesCode.map((code) => ({ code })),
        });
      }
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(existingUser)
        .addAndRemove(roles, existingUser.roles);
    }

    // Reload to get full relations
    const reloadedUser = await this.userRepository.findOne({
      where: { id: existingUser.id },
      relations: [
        'permissions',
        'roles',
        'roles.permissions',
        'roles.menuRoles',
      ],
    });

    return getFUllReturnUser(reloadedUser as User);
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

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-02 16:06:31
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-11 16:50:30
 * @FilePath: \nest-demo1\src\user\user.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByAccount(account: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { account } });
  }
  /**
   * 返回用户+权限
   * @param userId
   * @returns
   */
  async findOneWithPermissions(userId: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions', 'permissions.permission'], // 加载关联权限
    });
  }
  /**
   *  返回用户+权限
   * @param account
   * @returns
   */
  async findOneWithPermissionsByAccount(account: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { account },
      relations: ['permissions', 'permissions.permission'], // 加载关联权限
    });
  }
}

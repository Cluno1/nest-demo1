/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-16 18:19:52
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 14:24:56
 * @FilePath: \nest-demo1\src\menu\menu.service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { Menu } from 'src/entity/menu.entity';
import { UserService } from 'src/user/user.service';
import { useLogger } from 'src/utils/logger';
import { ReturnRoute } from './dto/returnRouter';

@Injectable()
export class MenuService {
  constructor(private readonly userService: UserService) {}

  async getAsyncMenu(userId: number): Promise<ReturnRoute[]> {
    const user = await this.userService.getUserMenuById(userId);
    useLogger.serviceEnd('menu', '', user);

    if (!user?.roles?.[0]?.menuRoles?.[0]?.menus) {
      return [];
    }

    const menus: Menu[] = user.roles[0].menuRoles[0].menus;
    return this.transformMenuToRoutes(menus);
  }

  private transformMenuToRoutes(menus: Menu[]): ReturnRoute[] {
    const topLevelMenus = menus.filter(
      (menu): menu is Menu & { parentId: null } => menu.parentId === null,
    );

    return topLevelMenus.map((menu) => {
      const route: ReturnRoute = {
        path: menu?.path,
        meta: {
          title: menu.title,
          ...(menu.icon ? { icon: menu.icon } : {}),
          rank: menu.rank,
        },
        ...this.getChildRoutes(menu.id, menus),
      };

      return route;
    });
  }

  private getChildRoutes(
    parentId: number,
    allMenus: Menu[],
  ): { children?: ReturnRoute[] } {
    const childMenus = allMenus.filter((child) => child.parentId === parentId);

    if (childMenus.length === 0) {
      return {};
    }

    return {
      children: childMenus.map((child) => ({
        path: child.path,
        meta: {
          title: child.title,
          ...(child.icon ? { icon: child.icon } : {}),
          rank: child.rank,
        },
        ...this.getChildRoutes(child.id, allMenus),
      })),
    };
  }
}

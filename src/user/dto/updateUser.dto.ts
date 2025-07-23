/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-22 23:29:10
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-23 15:01:24
 * @FilePath: \nest-demo1\src\user\dto\updateUser.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class UpdateUser {
  id?: number;
  account: string = '';

  avatar?: string;
  name?: string;
  /**
   * 权限角色code
   */
  rolesCode?: string[];
  /**
   * 该角色独有权限
   */
  uniPermissions?: string[];

  /**
   * 描述
   */
  description?: string;
  /**
   * 禁用
   */
  disable?: number;
  isDelete?: number;
  deleteTime?: Date | string;
}

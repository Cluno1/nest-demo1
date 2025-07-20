/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-20 18:19:20
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-20 22:47:45
 * @FilePath: \nest-demo1\src\menu\dto\returnRouter.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface RouteMeta {
  title: string;
  icon?: string | null;
  rank: number | null;
}

export interface ReturnRoute {
  path: string | null;
  meta: RouteMeta;
  name?: string | null;
  children?: ReturnRoute[];
}

<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-06-27 16:32:57
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-17 14:56:37
 * @FilePath: \nest-demo1\README.md
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
# NestJS HTTP 异常封装

## 常用异常类及对应状态码

| 异常类                          | 状态码 | 使用场景                     | 示例代码                                                                 |
|----------------------------------|--------|------------------------------|--------------------------------------------------------------------------|
| `BadRequestException`           | 400    | 客户端请求错误               | `throw new BadRequestException('无效参数')`                             |
| `UnauthorizedException`         | 401    | 未认证/登录失效              | `throw new UnauthorizedException('请先登录')`                           |
| `ForbiddenException`            | 403    | 无权限访问                   | `throw new ForbiddenException('权限不足')`                              |
| `NotFoundException`             | 404    | 资源不存在                   | `throw new NotFoundException('用户不存在')`                             |
| `MethodNotAllowedException`     | 405    | HTTP方法不允许               | `throw new MethodNotAllowedException('不允许的请求方法')`                |
| `NotAcceptableException`        | 406    | 无法满足Accept头要求         | `throw new NotAcceptableException('不支持的响应类型')`                  |
| `ConflictException`             | 409    | 资源冲突                     | `throw new ConflictException('用户名已存在')`                           |
| `GoneException`                 | 410    | 资源永久消失                 | `throw new GoneException('资源已永久删除')`                              |
| `PayloadTooLargeException`      | 413    | 请求体过大                   | `throw new PayloadTooLargeException('文件大小超过限制')`                 |
| `UnsupportedMediaTypeException` | 415    | 不支持的媒体类型             | `throw new UnsupportedMediaTypeException('不支持的Content-Type')`       |
| `InternalServerErrorException`  | 500    | 服务器内部错误               | `throw new InternalServerErrorException('服务器开小差了')`              |
| `NotImplementedException`      | 501    | 未实现的功能                 | `throw new NotImplementedException('功能开发中')`                       |
| `BadGatewayException`           | 502    | 网关错误                     | `throw new BadGatewayException('上游服务异常')`                         |
| `ServiceUnavailableException`   | 503    | 服务不可用                   | `throw new ServiceUnavailableException('系统维护中')`                   |
| `GatewayTimeoutException`       | 504    | 网关超时                     | `throw new GatewayTimeoutException('请求超时')`                         |

## 通用异常构造方式

```typescript
// 1. 只传消息
throw new BadRequestException('简单错误消息');

// 2. 传消息和描述
throw new BadRequestException('错误消息', {
  description: '更详细的错误描述'
});

// 3. 传响应对象
throw new BadRequestException({
  code: 1001,
  message: '自定义错误码消息',
  timestamp: new Date().toISOString()
});

// 4. 自定义状态码 (需配合@nestjs/common的HttpStatus枚举)
import { HttpStatus } from '@nestjs/common';
throw new HttpException('自定义消息', HttpStatus.I_AM_A_TEAPOT);
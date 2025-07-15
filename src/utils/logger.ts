/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-03 17:29:35
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-15 17:46:42
 * @FilePath: \nest-demo1\src\utils\logger.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

const GENERAL = 'GENERAL 基础';
const CONTROLLER = 'CONTROLLER 控制层';
export class UseLogger {
  /**
   * 时间戳
   * @returns
   */
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  private static formatPrefix(
    type: 'log' | 'error' | 'warn' | 'debug',
    context: string, //标注日志内容类型
    functionName: string,
  ): string {
    return `[${this.getTimestamp()}] [${type.toUpperCase()}] [${context}] [${functionName}]`;
  }

  // 基础日志方法
  static printLog(
    description: string = '',
    value: any = '',
    functionName: string | string[] = '',
    type: 'log' | 'error' | 'warn' = 'log',
  ): string {
    const prefix = this.formatPrefix(
      type,
      GENERAL,
      JSON.stringify(functionName),
    );
    const message = `${prefix} -- ${description}:`;

    switch (type) {
      case 'log':
        console.log(message, value);
        break;
      case 'error':
        console.error(message, value);
        break;
      case 'warn':
        console.warn(message, value);
        break;
      default:
        console.log(message, value);
    }

    return `${message} ${JSON.stringify(value)}`;
  }

  /**********************
   * Controller 专用方法 *
   **********************/
  static controllerLog(
    controllerName: string,
    methodName: string,
    params?: Record<string, any>,
    extraInfo?: string,
  ) {
    const prefix = this.formatPrefix(
      'log',
      CONTROLLER,
      `${controllerName}.${methodName}`,
    );
    console.log(`${prefix}`, {
      params,
      extra: extraInfo,
    });
  }

  static controllerError(
    controllerName: string,
    methodName: string,
    error: Error,
    requestData?: any,
  ) {
    const prefix = this.formatPrefix(
      'error',
      'CONTROLLER',
      `${controllerName}.${methodName}`,
    );
    console.error(`${prefix}`, {
      error: error.message,
      stack: error.stack,
      request: requestData,
    });
  }

  /********************
   * Service 专用方法 *
   ********************/
  static serviceStart(
    serviceName: string,
    methodName: string,
    inputParams?: any,
  ) {
    const prefix = this.formatPrefix(
      'log',
      'SERVICE',
      `${serviceName}.${methodName}`,
    );
    console.log(`${prefix} - START`, { input: inputParams });
  }

  static serviceEnd(
    serviceName: string,
    methodName: string,
    result: any,
    executionTime: number,
  ) {
    const prefix = this.formatPrefix(
      'log',
      'SERVICE',
      `${serviceName}.${methodName}`,
    );
    console.log(`${prefix} - END`, {
      result: JSON.stringify(result),
      time: `${executionTime}ms`,
    });
  }

  static serviceError(
    serviceName: string,
    methodName: string,
    error: Error,
    critical: boolean = false,
  ) {
    const prefix = this.formatPrefix(
      critical ? 'error' : 'warn',
      'SERVICE',
      `${serviceName}.${methodName}`,
    );
    const logger = critical ? console.error : console.warn;
    logger(`${prefix} - FAILED`, {
      error: error.message,
      stack: error.stack,
    });
  }

  /********************
   * HTTP 请求相关方法 *
   ********************/
  static httpRequest(
    method: string,
    url: string,
    statusCode: number,
    requestBody?: any,
    responseData?: any,
  ) {
    const prefix = this.formatPrefix(
      'log',
      'HTTP',
      `${method.toUpperCase()} ${url}`,
    );
    console.log(`${prefix} [${statusCode}]`, {
      request: requestBody,
      response: responseData,
    });
  }

  static httpError(
    method: string,
    url: string,
    statusCode: number,
    error: any,
  ) {
    const prefix = this.formatPrefix(
      'error',
      'HTTP',
      `${method.toUpperCase()} ${url}`,
    );
    console.error(`${prefix} [${statusCode}]`, {
      error: error.message,
      stack: error.stack,
    });
  }
}

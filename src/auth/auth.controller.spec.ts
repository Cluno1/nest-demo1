/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-07-14 14:33:32
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-07-14 14:57:06
 * @FilePath: \nest-demo1\src\auth\auth.controller.spec.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return user data and token on successful login', async () => {
      const loginDto: LoginDto = { account: 'root', password: '123123' };
      const mockResponse = {
        token: 'mockToken',
        user: {
          id: 2,
          account: 'root',
          name: 'root',
          permissions: [],
        },
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockResponse);

      const result = await authController.login(loginDto);
      expect(result).toEqual(mockResponse);

      expect(authService.validateUser).toHaveBeenCalledWith(
        loginDto.account,
        loginDto.password,
      );
    });
  });

  describe('register', () => {
    it('should return success message on successful registration', async () => {
      const registerDto: RegisterDto = {
        account: 'newUser',
        password: 'password123',
        name: 'New User',
      };
      const mockResponse = { msg: '注册成功' };

      jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

      const result = await authController.register(registerDto);
      expect(result).toEqual(mockResponse);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});

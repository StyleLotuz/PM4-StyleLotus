import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAllUsers() {
    return this.authService.authUsers();
  }

  @Post('signin')
  async login(@Body() loginUserData: LoginUserDto) {
    return this.authService.login(loginUserData);
  }
}

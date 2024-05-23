import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAllUsers() {
    return this.authService.authUsers();
  }

  @Post()
  async login(@Req() req: Request) {
    return this.authService.login(req);
  }
}

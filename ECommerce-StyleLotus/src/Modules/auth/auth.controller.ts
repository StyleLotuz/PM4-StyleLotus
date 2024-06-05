import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async SignUp(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('signin')
  async login(@Body() loginUserData: LoginUserDto) {
    return this.authService.login(loginUserData);
  }
}

import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  login(loginUserData: LoginUserDto) {
    return this.authRepository.login(loginUserData);
  }

  authUsers(): string {
    return 'Auth Service';
  }
}

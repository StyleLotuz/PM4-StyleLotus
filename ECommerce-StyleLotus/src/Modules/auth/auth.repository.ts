import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(loginUserData: LoginUserDto) {
    const { email, password } = loginUserData;
    const users = await this.usersRepository.find();
    const user = users.find((user) => user.email === email);

    if(!user){
      throw new NotFoundException('User not found')
    }

    if (user && user.password === password) {
      return user;
    }

    return { message: 'Email o password incorrectos' };
  }
}

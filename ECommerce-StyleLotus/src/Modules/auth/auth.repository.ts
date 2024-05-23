import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(req: Request) {
    const { email, password } = req.body;
    const users = await this.usersRepository.find();
    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      return user;
    }

    return { message: 'Email o password incorrectos' };
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async login(loginUserData: LoginUserDto) {
    const { email, password } = loginUserData;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) throw new BadRequestException('Email or password is invalid')

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    }

    const token = this.jwtService.sign(userPayload)

    return { message: 'User logged succesfully', token };
  }

  async signUp(userData: CreateUserDto) {
    const { email, password } = userData

    if (userData.password !== userData.confirmPassword) {
      throw new BadRequestException('Passwords does not match')
    }

    const user = await this.usersRepository.findOne({ where: { email } })
    if (user) {
      throw new BadRequestException('User Email is already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.usersRepository.save({ ...userData, password: hashedPassword })
    const { confirmPassword, password: _, ...userWithoutPassword } = newUser


    return userWithoutPassword
  }
}

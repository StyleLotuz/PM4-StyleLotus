import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;
    return this.usersService.getAllUser(pageNumber, limitNumber);
  }

  @HttpCode(201)
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(201)
  @Post()
  createNewUser(@Body() userData: User) {
    return this.usersService.createNewUser(userData);
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  modifyUser(@Param('id') id: string, @Body() dataToUpdate: User) {
    return this.usersService.modifyUser(id, dataToUpdate);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

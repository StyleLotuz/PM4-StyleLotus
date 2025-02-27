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
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @HttpCode(200)
  @Get()
  @Roles(Role.ADMIN)
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

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  modifyUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataToUpdate: Partial<CreateUserDto>,
  ) {
    return this.usersService.modifyUser(id, dataToUpdate);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}

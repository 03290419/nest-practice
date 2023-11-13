import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { CreateUserDto } from './dto/create-user-dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(
    @Query() dto: VerifyEmailDto,
  ): Promise<{ [key: string]: string }> {
    console.log(dto);
    return { message: 'email' };
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<{ [key: string]: string }> {
    console.log(dto);
    return { message: 'login' };
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return { id: 'keng', name: 'kengsuke', email: 'keng@gmail.com' };
  }
}

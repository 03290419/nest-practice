import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ValidationPipe } from 'validation.pipe';
import { UserInfo } from './UserInfo';
import { CreateUserDto } from './dto/create-user-dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    return await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.userService.login(email, password);
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return this.userService.getUserInfo(userId);
  }
}

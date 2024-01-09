import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { AuthGuard } from 'src/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserData } from 'src/decorators/user.decorator';
import { ValidationPipe } from 'validation.pipe';
import { UserInfo } from './UserInfo';
import { CreateUserDto } from './dto/create-user-dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserService } from './users.service';

class UserEntity {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

@Roles('user')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  @Roles('admin')
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    return await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    console.log('여긴디');

    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.userService.login(email, password);
  }
  @Roles('admin')
  @Get('/log')
  async logTest() {
    await this.userService.loggerTest();
  }

  @UseGuards(AuthGuard)
  @Get('/username1')
  getHello(
    @UserData(ValidationPipe)
    user: UserEntity,
  ) {
    console.log(user);
  }

  @Get('/username')
  getHello2(@UserData('name') name: string) {
    console.log(name);
  }

  @Get(':id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    return this.userService.getUserInfo(userId);
  }
}

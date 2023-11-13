import { Body, Post } from '@nestjs/common';

export class CreateUserDto {
  name: string;
  email: string;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    return `유저를 생성했습니다. 이름: ${name} 이메일: ${email}`;
  }
}

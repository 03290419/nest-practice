import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

// TypeOrmModule.forFeature = 유저 모듈 내에서 사용할 저장소를 등록
@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}

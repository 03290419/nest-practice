import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { LoggerModule } from 'src/logger/logger.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

// TypeOrmModule.forFeature = 유저 모듈 내에서 사용할 저장소를 등록
@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User]),
    AuthModule,
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [EmailModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}

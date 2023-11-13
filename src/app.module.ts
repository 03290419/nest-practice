import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}

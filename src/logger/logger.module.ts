import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyLogger } from './custom-logger.service';
import { Log } from './log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}

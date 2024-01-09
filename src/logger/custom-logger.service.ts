import { ConsoleLogger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

export class MyLogger extends ConsoleLogger {
  constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {
    super();
  }
  async error(message: string, stack?: string, context?: string) {
    super.error.apply(this, arguments);
    await this.saveLog('error', message, stack, context);
  }
  private async saveLog(
    type: string,
    message: string,
    stack?: string,
    context?: string,
  ) {
    const log = new Log();
    log.message = message;
    log.level = type;
    log.stack = stack;
    log.context = context;
    await this.logRepository.save(log);
  }
}

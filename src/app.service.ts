import { Injectable } from '@nestjs/common';
import { MyLogger } from './log/custom.logger';

@Injectable()
export class AppService {
  private readonly logger = new MyLogger();
  getHello(): string {
    this.logger.error('level: error');
    this.logger.warn('level: warn');
    this.logger.log('level: log');
    this.logger.verbose('level: verbose');
    this.logger.debug('level: debug');
    return 'Hello World!';
  }
}

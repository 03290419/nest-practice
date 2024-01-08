import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, arguments);
    this.doSomething();
  }
  private doSomething() {
    // 로깅 부가작업 작성
  }
}

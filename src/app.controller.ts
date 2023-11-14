import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/db-host-from-config')
  getDatabaseHostFromCOnfigService(): string {
    console.log(this.configService.get('DATABASE_HOST'));
    console.log(this.configService.get('NODE_ENV'));

    return this.configService.get('DATABASE_HOST');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}

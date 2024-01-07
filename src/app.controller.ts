import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from 'validation.pipe';
import { AppService } from './app.service';
import { Roles } from './decorators/role.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Roles('admin')
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

  @Get(':id')
  findOne(
    @Param('id', ValidationPipe)
    id: number,
  ) {
    return { message: id };
  }
}

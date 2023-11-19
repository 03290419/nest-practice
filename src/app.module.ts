import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from './config/auth.config';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validationSchema';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RolesGuard } from './roles.guard';
import { UsersModule } from './users/users.module';

// .forRoot 메서드는 DynamicModule을 리턴하는 정적 메서드다. 비동기 함수일 때는 forRootAsync, registerAsync로 한다.
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3307,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: '/users', method: RequestMethod.GET })
      .forRoutes('/users');
    // users 라우터에 바인딩 보통은 컨트롤러를 바인딩함
  }
}
// @TODO envFilePath에 절대경로 넣고 dist 폴더에 .env 구성되게 수정
/**
 * ConfigModule에서 load 속성을 통해 앞서 구성해둔 ConfigFactory를 지정
 * isGlobal = 전역 모듈로 동작하게 해 어느 모듈에서나 사용할 수 있다.
 *  환경 변수의 값에 대해 유효성 검사를 수행하도록 joi를 이용하여 유효성 검사 객체를 작성한다.
 */

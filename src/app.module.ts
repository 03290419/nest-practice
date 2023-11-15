import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';

// .forRoot 메서드는 DynamicModule을 리턴하는 정적 메서드다. 비동기 함수일 때는 forRootAsync, registerAsync로 한다.
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
// @TODO envFilePath에 절대경로 넣고 dist 폴더에 .env 구성되게 수정
/**
 * ConfigModule에서 load 속성을 통해 앞서 구성해둔 ConfigFactory를 지정
 * isGlobal = 전역 모듈로 동작하게 해 어느 모듈에서나 사용할 수 있다.
 *  환경 변수의 값에 대해 유효성 검사를 수행하도록 joi를 이용하여 유효성 검사 객체를 작성한다.
 */

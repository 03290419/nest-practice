import { registerAs } from '@nestjs/config';

export default registerAs('email', () => {
  console.log(process.env.EMAIL_SERVICE);
  return {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    baseURL: process.env.EMAIL_BASE_URL,
  };
});

/**
 * registerAs 의 첫 번째 인수로 토큰을 문자열로 받고,
 * 두 번째 인수로 ConfigFactory 함수를 상속하는 타입 TFactory의 함수를 받아서
 * TFactory와 ConfigFactoryKeyHost 를 합친 타입의 함수를 리턴한다.
 */

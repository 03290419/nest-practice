import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    jwtSecret: process.env.JWT_SECRET,
  };
});

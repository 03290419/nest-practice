import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExist(email);
    if (userExist) {
      throw new BadRequestException('해당 email로는 가입할 수 없습니다.');
    }
    const signupVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }
  private async checkUserExist(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return user !== undefined;
  }
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new User();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
    return { message: 'ok' };
  }
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async login(email: string, password: string): Promise<string> {
    throw new Error('Method not implemented');
  }
  async getUserInfo(userid: string): Promise<UserInfo> {
    throw new Error('Method not implemented');
  }
}

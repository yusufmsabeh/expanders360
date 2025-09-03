import { BadRequestException, Injectable } from '@nestjs/common';
import SigninDto from './DTO/signin.dto';
import bcrypt from 'bcrypt';
import SignupDto from './DTO/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto) {
    return await this.userService.createUser(signupDto);
  }

  async signIn(signinDto: SigninDto) {
    const client = await this.userService.findByEmail(signinDto.email);
    if (!client) throw new BadRequestException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(
      signinDto.password,
      client.password,
    );
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');
    return {
      accessToken: this.jwtService.sign({ id: client.id }),
    };
  }
  async getProfile(id: number) {
    return await this.userService.findById(id);
  }
}

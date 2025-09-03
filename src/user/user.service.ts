import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SignupDto from '../auth/DTO/signup.dto';
import bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signupDto: SignupDto) {
    if (await this.findByEmail(signupDto.email)) {
      throw new BadRequestException('Email already exists');
    }
    signupDto.password = await bcrypt.hash(signupDto.password, 10);
    const user = this.userRepository.create({
      companyName: signupDto.companyName,
      contactEmail: signupDto.email,
      password: signupDto.password,
    });
    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ contactEmail: email });
  }
  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignupDto from './DTO/signup.dto';
import SignInDto from './DTO/signin.dto';
import { AuthGuard } from './auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signInClient(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Post('/signup')
  async signUpClient(@Body() body: SignupDto) {
    return await this.authService.signUp(body);
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user.id);
  }
}

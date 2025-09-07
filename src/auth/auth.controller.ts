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
import { AuthGuard } from './gurd/auth.guard';
import HttpResponseUtil from '../util/httpResponse.util';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signInClient(@Body() body: SignInDto) {
    return HttpResponseUtil(
      200,
      'Sign In successfully',
      await this.authService.signIn(body),
    );
  }

  @Post('/signup')
  async signUpClient(@Body() body: SignupDto) {
    await this.authService.signUp(body);
    return HttpResponseUtil(200, 'Sing up successfully');
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    return HttpResponseUtil(
      200,
      'Profile',
      await this.authService.getProfile(req['user'].id),
    );
  }
}

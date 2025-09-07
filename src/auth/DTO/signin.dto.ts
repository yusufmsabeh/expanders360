import { IsEmail, IsNotEmpty } from 'class-validator';

class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
export default SignInDto;

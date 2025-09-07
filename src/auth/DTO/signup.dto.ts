import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;
}
export default SignupDto;

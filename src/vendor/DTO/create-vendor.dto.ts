import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

class createVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  countriesSupported: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  servicesOffered: string[];

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  responseSLAHours: number;
}
export default createVendorDto;

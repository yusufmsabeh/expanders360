import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  servicesNeeded: string[];

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  budget: number;
}
export default CreateProjectDto;

import { IsOptional, IsString } from 'class-validator';

export class GetDocumentsDto {
  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}

import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class StudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  standard: number;
  
  @IsString()
  @IsNotEmpty()
  division: string;

}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
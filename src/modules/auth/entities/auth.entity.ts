import { IsEmail, IsString, Length } from 'class-validator';

export class Auth {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  senha: string;
}

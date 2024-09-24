import { IsEmail, IsNotEmpty } from 'class-validator';

export class Authsignindto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

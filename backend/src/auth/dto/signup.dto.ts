import { IsEmail, IsNotEmpty } from 'class-validator';

export class Authsignupdto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  firstName?: string;
  lastName?: string;
}

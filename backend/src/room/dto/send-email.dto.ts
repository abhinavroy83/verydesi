import { IsEmail, IsNotEmpty, isString, IsString } from 'class-validator';

export class sendEmailDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEmail()
  ownerEmail: string;

  @IsNotEmpty()
  @IsEmail()
  RoomLink: string;
}

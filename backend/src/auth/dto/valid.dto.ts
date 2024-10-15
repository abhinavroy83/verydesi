import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUppercase,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthValidEmail {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class AuthValidPassword {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[A-Z].*/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/.*[a-z].*/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
  @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}

export class Authupdatpassword {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/.*[A-Z].*/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/.*[a-z].*/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
  @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, {
    message: 'Password must contain at least one special character',
  })
  newpassword: string;
  @IsString()
  @IsNotEmpty()
  oldpassword: string;
}

import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Authsignupdto } from './signup.dto';

export class UpdateUserdto extends PartialType(
  OmitType(Authsignupdto, ['email', 'password'] as const),
) {
  belongcity?: string;
  firstName?: string;
  lastName?: string;
  phone_number?: string;
  userimg?: string;
  dob?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  pin?: string;
}

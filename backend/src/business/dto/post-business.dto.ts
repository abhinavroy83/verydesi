import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
  IsDate,
  isString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SalesDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsString()
  couponCodes?: string;
}

export class OpenHoursDto {
  @IsString()
  monday: string;

  @IsString()
  tuesday: string;

  @IsString()
  wednesday: string;

  @IsString()
  thursday: string;

  @IsString()
  friday: string;
}

export class BusinessDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  userPhone: string;

  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  establishedsince: string;

  @IsNotEmpty()
  @IsString()
  legalName: string;

  @IsNotEmpty()
  @IsString()
  businessType: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  categories: string[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  additionaladress: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEnum(['ein', 'license', 'bill', 'registration', 'other'])
  verificationMethod: 'ein' | 'license' | 'bill' | 'registration' | 'other';

  @IsOptional()
  @IsString()
  @Length(9, 9, { message: 'EIN must be 9 digits' })
  einNumber?: string;

  @ValidateNested()
  @Type(() => OpenHoursDto)
  openHours: OpenHoursDto;

  @IsNotEmpty()
  @IsString()
  pdfurl: string;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  Imageurl: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString()
  logoUrl: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  languages: string[];

  @ValidateNested()
  @Type(() => SalesDto)
  sales: SalesDto;
}

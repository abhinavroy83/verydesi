import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  UserId: string;

  @IsOptional()
  @IsDateString()
  postedon?: Date;

  @IsOptional()
  @IsString()
  Title?: string;

  @IsOptional()
  @IsString()
  postingincity?: string;

  @IsOptional()
  @IsString()
  postingtype?: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsString()
  Propertytype?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  Stay_lease?: string;

  @IsOptional()
  @IsDate()
  Avaliblity_from?: string;

  @IsOptional()
  @IsDate()
  Available_to?: string;

  @IsOptional()
  @IsString()
  Day_Available?: string;

  @IsOptional()
  @IsString()
  Attchd_Bath?: string;

  @IsOptional()
  @IsString()
  Preferred_gender?: string;

  @IsOptional()
  @IsNumber()
  Expected_Rooms?: number;

  @IsOptional()
  @IsBoolean()
  negotiable?: boolean;

  @IsOptional()
  @IsBoolean()
  hideRent?: boolean;

  @IsOptional()
  @IsString()
  Pricemodel?: string;

  @IsOptional()
  @IsString()
  Bath_Location?: string;

  @IsOptional()
  @IsString()
  Couples_welcome?: string;

  @IsOptional()
  @IsNumber()
  Desposite?: number;

  @IsOptional()
  @IsString()
  is_room_furnished?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  Utility_include?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  Amenities_include?: string[];

  @IsOptional()
  @IsString()
  Vegeterian_prefernce?: string;

  @IsOptional()
  @IsString()
  Smoking_policy?: string;

  @IsOptional()
  @IsString()
  Pet_friendly?: string;

  @IsOptional()
  @IsString()
  Open_house_schedule?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  Imgurl?: string[];

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsEnum(['Point'])
  type: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  coordinates: number[];
}

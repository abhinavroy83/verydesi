import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
  ArrayMaxSize,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ArtistDTO {
  @IsString({ message: 'Artist name is required' })
  @IsNotEmpty({ message: 'Artist name is required' })
  name: string;
}

export class EventFormDTO {
  @IsString({ message: 'PostingIn is required' })
  @IsNotEmpty({ message: 'PostingIn is required' })
  eventpostingcity: string;

  @IsString()
  @Length(2, undefined, {
    message: 'Event title must be at least 2 characters.',
  })
  eventTitle: string;

  @IsString()
  @IsOptional()
  eventType: string;

  @IsString()
  @IsOptional()
  eventprice?: string;

  @IsDate({ message: 'Start date must be a valid date.' })
  @Type(() => Date)
  startDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Start time is required.' })
  startTime: string;

  @IsDate({ message: 'End date must be a valid date.' })
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'End time is required.' })
  endTime: string;

  @IsString()
  @IsNotEmpty({ message: 'Time zone is required.' })
  timeZone: string;

  @IsString()
  @IsNotEmpty({ message: 'Repeat event option is required.' })
  repeatEvent: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Venue name is required.' })
  venueName: string;

  @IsString()
  @IsNotEmpty({ message: 'Event type is required.' })
  entryoption: string;

  @IsOptional()
  @IsString()
  virtualurl?: string;

  @IsOptional()
  @IsString()
  address?: string;

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

  @IsArray({ message: 'At least one language must be selected.' })
  @IsString({ each: true })
  languages: string[];

  @IsString()
  @IsNotEmpty({ message: 'Organization name is required' })
  organization: string;

  @IsString()
  @IsNotEmpty({ message: 'Hosted By is required' })
  hostedBy: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ValidateNested({ each: true })
  @Type(() => ArtistDTO)
  @IsArray()
  @ArrayMaxSize(5, { message: 'You can upload a maximum of 5 artists' })
  artists: ArtistDTO[];

  @IsArray()
  @ArrayMaxSize(5, { message: 'You can upload a maximum of 5 images' })
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  coordinates: number[];
}

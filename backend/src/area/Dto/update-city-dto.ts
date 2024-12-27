import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class updateCityDto {
  @IsEnum(['USa', 'Canada'], {
    message: 'country must be either "Usa" or "Canada"',
  })
  @IsOptional()
  country?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  state?: string[];

  @IsString()
  @IsOptional()
  primaryState?: string;

  @IsString()
  @IsOptional()
  area?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subarea?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  zipcode?: string[];
}

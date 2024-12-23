import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCityDto {

  @IsEnum(['Usa', 'Canada'], {
    message: 'country must be either "Usa" or "Canada"',
  })
  @IsNotEmpty()
  country: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  state: string[];

  @IsString()
  @IsNotEmpty()
  primaryState: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subarea: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  zipcode: string[];
}

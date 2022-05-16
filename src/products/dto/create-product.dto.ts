import { ProductStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @IsString()
  @IsNotEmpty()
  account: string;

  @IsOptional()
  referenceCode?: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  identifiers?: string[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({
    each: true,
  })
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slug?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  updatedAt?: string;
}

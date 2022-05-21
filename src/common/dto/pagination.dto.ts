import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'src/utils/constants.utils';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number = DEFAULT_SIZE;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  account?: string;
}

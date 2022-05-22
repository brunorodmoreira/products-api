import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreateAttributeDto
  implements Omit<Prisma.AttributeUncheckedCreateInput, 'productId'>
{
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  label?: string;
}

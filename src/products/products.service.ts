import { Injectable } from '@nestjs/common';
import { parseOptionsToPrismaFindManyArgs } from 'src/utils/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: data,
    });
  }

  findAll(options: any): Promise<Product[]> {
    const args = parseOptionsToPrismaFindManyArgs(options);

    return this.prisma.product.findMany(args);
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}

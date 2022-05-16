import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '../utils/constants';
import {
  parsePageAndSizeToSkipAndTake,
  parseQueryToWhereArgs,
} from '../utils/query';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data: data,
    });
  }

  findAll(options: any): Promise<Product[]> {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE, ...query } = options;

    const { skip, take } = parsePageAndSizeToSkipAndTake(page, size);

    return this.prisma.product.findMany({
      skip,
      take,
      where: parseQueryToWhereArgs(query),
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}

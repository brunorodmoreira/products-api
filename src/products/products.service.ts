import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'src/utils/constants';
import {
  parsePageAndSizeToSkipAndTake,
  parseQueryToWhereArgs,
} from 'src/utils/query';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
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

  update(
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Partial<Product>> {
    return this.prisma.product.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}

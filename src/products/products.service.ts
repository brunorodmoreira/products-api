import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'src/utils/constants';
import {
  parsePageAndSizeToSkipAndTake,
  parseQueryToWhereArgs,
} from 'src/utils/query';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

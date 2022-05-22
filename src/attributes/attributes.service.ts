import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { parseOptionsToPrismaFindManyArgs } from '../utils/prisma';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

const DEFAULT_SELECTION = {
  id: true,
  name: true,
  value: true,
  label: true,
  productId: false,
};

@Injectable()
export class AttributesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAttributeDto & { productId: number }) {
    this.prisma.attribute;
    return this.prisma.attribute.create({
      data,
      select: DEFAULT_SELECTION,
    });
  }

  findAll(options: any): Promise<Attribute[]> {
    const args = parseOptionsToPrismaFindManyArgs(options);

    return this.prisma.attribute.findMany({
      ...args,
      select: DEFAULT_SELECTION,
    });
  }

  findOne(id: number, productId: number): Promise<Attribute | null> {
    return this.prisma.attribute.findFirst({
      where: { id, productId },
      select: DEFAULT_SELECTION,
    });
  }

  async update(id: number, productId: number, data: UpdateAttributeDto) {
    return this.prisma.$transaction(async (prisma: PrismaService) => {
      const { productId: returnedProductId, ...attribute } =
        await prisma.attribute.update({
          where: { id },
          data,
        });

      if (returnedProductId !== productId) {
        throw new NotFoundException('Attribute not associated with product');
      }

      return attribute;
    });
  }

  remove(id: number, productId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const { productId: returnedProductId, ...attribute } =
        await prisma.attribute.delete({
          where: { id },
        });

      if (returnedProductId !== productId) {
        throw new NotFoundException('Attribute not associated with product');
      }

      return attribute;
    });
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      const product = {
        name: 'Teste',
        account: 'test',
      };

      const result = {
        ...product,
        id: 1,
        referenceCode: null,
        identifiers: [],
        name: null,
        description: null,
        slug: null,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.product, 'create')
        // @ts-ignore
        .mockImplementation(async () => result);

      expect(await service.create(product)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const result = [
        {
          id: 1,
          name: 'Teste',
          account: 'test',
          referenceCode: null,
          identifiers: [],
        },
      ];

      jest
        .spyOn(prisma.product, 'findMany')
        // @ts-ignore
        .mockImplementation(async () => result);

      expect(await service.findAll({})).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = {
        id: 1,
        name: 'Teste',
        account: 'test',
        referenceCode: null,
        identifiers: [],
      };

      jest
        .spyOn(prisma.product, 'findUnique')
        // @ts-ignore
        .mockImplementation(async () => result);

      expect(await service.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should return a product', async () => {
      const product = {
        id: 1,
        name: 'Teste',
        account: 'test',
        referenceCode: null,
        identifiers: [],
        description: null,
        slug: null,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = {
        ...product,
        id: 1,
        referenceCode: null,
        identifiers: [],
        name: null,
        description: null,
        slug: null,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.product, 'update')
        // @ts-ignore
        .mockImplementation(async () => result);

      expect(await service.update(1, product)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should return a product', async () => {
      const result = {
        id: 1,
        name: 'Teste',
        account: 'test',
        referenceCode: null,
        identifiers: [],
        description: null,
        slug: null,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.product, 'delete')
        // @ts-ignore
        .mockImplementation(async () => result);

      expect(await service.remove(1)).toEqual(result);
    });
  });
});

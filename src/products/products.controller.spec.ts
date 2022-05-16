import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatus } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      const product: CreateProductDto = {
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

      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(product)).toEqual(result);
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
          description: null,
          slug: null,
          status: ProductStatus.INACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await controller.findAll({})).toEqual(result);
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
        description: null,
        slug: null,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => result);
      expect(await controller.findOne({ id: 1 })).toEqual(result);
    });
  });

  describe('update', () => {
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

      jest.spyOn(service, 'update').mockImplementation(async () => result);
      expect(await controller.update({ id: 1 }, {})).toEqual(result);
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

      jest.spyOn(service, 'remove').mockImplementation(async () => result);
      expect(await controller.remove({ id: 1 })).toEqual(result);
    });
  });
});

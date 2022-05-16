import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to prisma', async () => {
      const connect = jest.spyOn(service, '$connect');

      await service.onModuleInit();

      expect(connect).toHaveBeenCalled();
    });
  });

  describe('enableShutdownHooks', () => {
    it('should enable shutdown hooks', async () => {
      const app = {
        close: jest.fn(),
      };

      const on = jest.spyOn(service, '$on');

      await service.enableShutdownHooks(app as any);

      expect(on).toHaveBeenCalledWith('beforeExit', expect.any(Function));
    });
  });
});

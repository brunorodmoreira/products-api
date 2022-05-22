import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';

describe('AttributesController', () => {
  let controller: AttributesController;
  let service: AttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributesController],
      providers: [AttributesService],
    }).compile();

    controller = module.get<AttributesController>(AttributesController);
    service = module.get<AttributesService>(AttributesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of attributes', async () => {
      const result = [
        {
          id: 1,
          name: 'Teste',
          value: 'test',
          label: 'test',
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll({ productId: 1 }, {})).toEqual(result);
    });
  });
});

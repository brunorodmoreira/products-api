import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FindOneDto } from 'src/common/dto/find-one.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductIdDto } from 'src/common/dto/product-id.dto';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('products/:productId/attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  create(
    @Param() { productId }: ProductIdDto,
    @Body() createAttributeDto: CreateAttributeDto,
  ) {
    return this.attributesService.create({ ...createAttributeDto, productId });
  }

  @Get()
  findAll(@Param() { productId }: ProductIdDto, @Query() query: PaginationDto) {
    return this.attributesService.findAll({ ...query, productId });
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneDto, @Param() { productId }: ProductIdDto) {
    return this.attributesService.findOne(id, productId);
  }

  @Patch(':id')
  update(
    @Param() { id }: FindOneDto,
    @Param() { productId }: ProductIdDto,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(+id, productId, updateAttributeDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneDto, @Param() { productId }: ProductIdDto) {
    return this.attributesService.remove(id, productId);
  }
}

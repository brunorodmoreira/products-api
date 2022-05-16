import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundInterceptor } from '../core/interceptors/not-found.interceptor';
import { PaginationParams } from '../common/params/pagination.params';
import { FindOneParams } from '../common/params/find-one.params';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: PaginationParams) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param() { id }: FindOneParams) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: FindOneParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.productsService.remove(id);
  }
}

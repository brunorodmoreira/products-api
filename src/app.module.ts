import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [PrismaModule, CoreModule, ProductsModule, AttributesModule],
})
export class AppModule {}

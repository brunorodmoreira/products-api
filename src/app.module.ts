import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [ProductsModule, AttributesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

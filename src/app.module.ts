import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductsModule } from './products/products.module';
import { AttributesModule } from './attributes/attributes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductsModule, AttributesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

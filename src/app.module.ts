import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ProductsModule, PrismaModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

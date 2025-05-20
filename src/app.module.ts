import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [PrismaService, CreateProductService],
})
export class AppModule {}

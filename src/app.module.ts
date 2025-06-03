import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductsRepository } from './products.repository';
import { CreateModelController } from './create-model.controller';
import { CreateModelService } from './create-model.service';
import { ModelsRepository } from './models.repository';

@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController],
  providers: [PrismaService, CreateProductService, ProductsRepository, CreateModelService, ModelsRepository],
})
export class AppModule {}

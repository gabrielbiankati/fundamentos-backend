import { Module } from '@nestjs/common';
import { CreateProductController } from './products/create-product.controller'; 
import { PrismaService } from './prisma.service';
import { CreateProductService } from './products/create-product.service'; 
import { ProductsRepository } from './products/products.repository';
import { CreateModelController } from './models/create-model.controller';
import { DeleteModelController } from './models/delete-model.controller';
import { DeleteProductController } from './products/delete-product.controller';
import { EditModelController } from './models/edit-model.controller'; 
import { EditProductController } from './products/edit-product.controller';
import { FetchRecentModelsController } from './models/fetch-recent-models.controller';
import { FetchRecentProductsController } from './products/fetch-recent-products.controller';
import { GetProductByIdController } from './products/get-product-by-id.controller'; 
import { GetModelByIdController } from './models/get-model-by-id.controller';
import { UpdateAvailableProductController } from './products/update-available-product.controller';
import { CreateModelService } from './models/create-model.service'; 
import { DeleteModelService } from './models/delete-model.service';
import { DeleteProductService } from './products/delete-product.service';
import { EditModelService } from './models/edit-model.service';
import { EditProductService } from './products/edit-product.service';
import { FetchRecentModelsService } from './models/fetch-recent-models.service';
import { FetchRecentProductsService } from './products/fetch-recent-products.service';
import { GetProductByIdService } from './products/get-product-by-id.service';
import { GetModelByIdService } from './models/get-model-by-id.service';
import { UpdateAvailableProductService } from './products/update-available-product.service';
import { ModelsRepository } from './models/models.repository'; 
import { CreateUserController } from './users/create-user.controller';
import { UsersRepository } from './users/users.repository';
import { CreateUserService } from './users/create-user.service';
import { FetchRecentUsersController } from './users/fetch-recent-users.controller';
import { FetchRecentUsersService } from './users/fetch-recent-users.service';
import { GetUserByIdController } from './users/get-user-by-id.controller';
import { GetUserByIdService } from './users/get-user-by-id.service';
import { DeleteUserController } from './users/delete-user.controller';
import { DeleteUserService } from './users/delete-user.service';
import { CreateOrderController } from './orders/create-order.controller';
import { CreateProfileController } from './profiles/create-profile.controller';
import { CreateOrderService } from './orders/create-order.service';
import { CreateProfileService } from './profiles/create-profile.service';
import { GetOrderByIdController } from './orders/get-order-by-id.controller';
import { GetOrderByUserIdController } from './orders/get-order-by-user-id.controller';
import { GetOrderByIdService } from './orders/get-order-by-id.service';
import { GetOrderByUserIdService } from './orders/get-order-by-user-id.service';
import { EditProfileController } from './profiles/edit-profile.controller';
import { EditProfileService } from './profiles/edit-profile.service';
import { GetProfileByIdController } from './profiles/get-profile-by-id.controller';
import { GetProfileByIdService } from './profiles/get-profile-by-id.service';

@Module({
  imports: [],
  controllers: [DeleteUserController ,GetUserByIdController, FetchRecentUsersController, CreateProductController, CreateModelController, DeleteModelController, DeleteProductController, EditModelController, EditProductController, FetchRecentModelsController, FetchRecentProductsController, GetProductByIdController, GetModelByIdController, UpdateAvailableProductController, CreateUserController, CreateOrderController, CreateProfileController, GetOrderByIdController, GetOrderByUserIdController, EditProfileController, GetProfileByIdController],
  providers: [DeleteUserService ,GetUserByIdService ,FetchRecentUsersService, CreateUserService ,PrismaService, CreateProductService, CreateModelService, DeleteModelService, DeleteProductService, EditModelService, EditProductService, FetchRecentModelsService, FetchRecentProductsService, GetProductByIdService, GetModelByIdService, UpdateAvailableProductService, ProductsRepository, ModelsRepository, UsersRepository, CreateOrderService, CreateProfileService, GetOrderByIdService, GetOrderByUserIdService, EditProfileService, GetProfileByIdService],
})
export class AppModule {}

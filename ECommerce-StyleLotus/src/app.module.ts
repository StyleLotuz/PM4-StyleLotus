import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { ProductsModule } from './Modules/products/products.module';
import { AuthModule } from './Modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Modules/categories/categories.module';
import { OrdersModule } from './Modules/orders/orders.module';
import { FilesModule } from './Modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './Modules/cloudinary/cloudinary.module';
import { CategoriesController } from './Modules/categories/categories.controller';
import { ProductsController } from './Modules/products/products.controller';
import { CategoriesService } from './Modules/categories/categories.service';
import { ProductsService } from './Modules/products/products.service';
import { CategoriesRepository } from './Modules/categories/categories.repository';
import { ProductsRepository } from './Modules/products/products.repository';
import { Product } from './entities/product.entity';
import { Category } from './entities/categories.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FilesModule,
    CloudinaryModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    CategoriesController,
    ProductsController,
    CategoriesService,
    ProductsService,
    CategoriesRepository,
    ProductsRepository,
  ],
})
export class AppModule {
  constructor(
    private readonly categoriesController: CategoriesController,
    private readonly productsController: ProductsController,
  ) {}
  async onApplicationBootstrap() {
    await this.categoriesController.seedCategories();
    await this.productsController.seedProducts();
  }
}

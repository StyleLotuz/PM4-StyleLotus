import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { Category } from 'src/entities/categories.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User])],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesRepository],
})
export class ProductsModule {}

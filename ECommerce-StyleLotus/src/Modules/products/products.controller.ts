import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { Product } from 'src/entities/product.entity';
import { productsData } from 'src/helpers/products';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  @HttpCode(200)
  @Get()
  getAllProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;
    return this.productsService.getAllProducts(pageNumber, limitNumber);
  }

  @Get('seeder')
  async seedProducts() {
    for (const products of productsData) {
      const existingProducts = await this.productsRepository.findOne({
        where: { name: products.name },
      });

      if (!existingProducts) {
        const category = await this.categoriesRepository.findOne({
          where: { name: products.category },
        });
        if (!category) {
          console.error(`Category not found: ${products.category}`);
          continue;
        }

        const newProduct = new Product();
        newProduct.name = products.name;
        newProduct.description = products.description;
        newProduct.price = products.price;
        newProduct.stock = products.stock;
        newProduct.category_id = category;
        await this.productsRepository.save(newProduct);
      }
    }
  }

  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  createNewProduct(@Body() product: Product) {
    return this.productsService.createNewProduct(product);
  }

  @HttpCode(201)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  modifyProduct(@Param('id') id: string, @Body() updateData: Product) {
    return this.productsService.modifyProduct(id, updateData);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}

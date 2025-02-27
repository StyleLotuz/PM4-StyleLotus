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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/Guards/auth.guard';
import { Product } from 'src/entities/product.entity';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  seedProducts() {
    return this.productsService.seederProducts();
  }

  @HttpCode(201)
  @Post()
  // @UseGuards(AuthGuard)
  createNewProduct(@Body() product: Product & { categoryId: string }) {
    return this.productsService.createNewProduct(product);
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  modifyProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: Partial<Product>,
  ) {
    console.log(id);
    console.log(updateData);
    return this.productsService.modifyProduct(id, updateData);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}

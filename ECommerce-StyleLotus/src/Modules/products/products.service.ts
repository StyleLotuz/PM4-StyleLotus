import { ProductsRepository } from './products.repository';
import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  seederProducts() {
    return this.productsRepository.seederProducts();
  }

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProduct(page, limit);
  }

  createNewProduct(product: Product & { categoryId: string }) {
    console.log(product);
    return this.productsRepository.createNewProduct(product);
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  modifyProduct(id: string, updateData: Partial<Product>) {
    console.log(id);
    console.log(updateData);
    return this.productsRepository.modifyProduct(id, updateData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}

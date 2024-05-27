import { ProductsRepository } from './products.repository';
import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository
  ) { }

  seederProducts(){
    this.productsRepository.seederProducts()
  }

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProduct(page, limit)
  }

  createNewProduct(product: Product) {
    this.productsRepository.createNewProduct(product)
  }

  getProductById(id: string) {
    this.productsRepository.getProductById(id)
  }

  modifyProduct(id: string, updateData: Product) {
    this.productsRepository.modifyProduct(id, updateData)
  }

  deleteProduct(id: string) {
    this.productsRepository.deleteProduct(id)
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getAllProducts(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    try {
      const [products] = await this.productsRepository.findAndCount({
        skip: startIndex,
        take: limit,
      });
      return products;
    } catch (err) {
      console.error('Error fetching products', err);
      throw new Error('Could not fetching products');
    }
  }

  createNewProduct(product: Product) {
    return this.productsRepository.save(product);
  }

  getProductById(id: string) {
    return this.productsRepository.findOneBy({ id });
  }

  modifyProduct(id: string, updateData: Product) {
    return this.productsRepository.update(id, updateData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.delete(id);
  }
}

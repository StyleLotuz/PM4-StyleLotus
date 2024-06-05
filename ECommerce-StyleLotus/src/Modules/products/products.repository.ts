import { Category } from 'src/entities/categories.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as data from '../../helpers/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async seederProducts() {
    try {
      for (const dato of data) {
        const existingProduct = await this.productsRepository
          .createQueryBuilder('product')
          .where('product.name =:name', { name: dato.name })
          .getOne();

        if (!existingProduct) {
          const category = await this.categoryRepository
            .createQueryBuilder('category')
            .where('category.name = :name', { name: dato.category })
            .getOne();

          if (!category) {
            console.error(
              `Category ${dato.category} not found for product ${dato.name}`,
            );
            continue;
          }

          const newProduct = this.productsRepository.create({
            name: dato.name,
            description: dato.description,
            price: dato.price,
            stock: dato.stock,
            imgUrl: dato.imgUrl,
            category: category,
          });

          await this.productsRepository.save(newProduct);
        }
      }
    } catch (err) {
      console.log('Error al realizar la carga de los productos');
      throw new Error('Error al cargar los productos');
    }
  }

  async getAllProduct(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    try {
      const [products] = await this.productsRepository.findAndCount({
        skip: startIndex,
        take: limit,
        relations: ['category'],
      });
      return products;
    } catch (err) {
      console.error('Error fetching products', err);
      throw new Error('Could not fetching products');
    }
  }

  async createNewProduct(
    product: Product & { categoryId: string },
  ): Promise<Product> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: product.categoryId },
      });

      if (!category) throw new NotFoundException('Category not found');

      const newProduct = await this.productsRepository.create({
        ...product,
        category,
      });

      return this.productsRepository.save(newProduct);
    } catch (err) {
      throw new BadRequestException('Could save a new Product');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: ['category'],
      });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (err) {
      throw new Error(`Could not find the product with id ${id}`);
    }
  }

  async modifyProduct(id: string, updateData: Partial<Product>) {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new Error('This product does not exist');
      }

      Object.assign(product, updateData);

      return await this.productsRepository.save(product);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProduct(id: string) {
    try {
      const deletedProduct = await this.productsRepository.delete(id);

      if (!deletedProduct)
        throw new NotFoundException('Product to delete does not exist');

      return deletedProduct;
    } catch (err) {
      throw new Error('Error deleting this product');
    }
  }
}

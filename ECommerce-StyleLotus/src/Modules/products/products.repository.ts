import { Category } from 'src/entities/categories.entity';
import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
      const data = await require('../../helpers/data.json');

      for (const dato of data) {
        const existingProduct = await this.productsRepository.findOne({
          where: { name: dato.name },
        });
        if (!existingProduct) {
          const newProduct = new Product();
          newProduct.name = dato.name;
          newProduct.description = dato.description;
          newProduct.price = dato.price;
          newProduct.stock = dato.stock;
          newProduct.imgUrl = dato.imgUrl;
          const category = await this.categoryRepository.findOne({
            where: { name: dato.category },
          });
          newProduct.category = category;
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
      });
      return products;
    } catch (err) {
      console.error('Error fetching products', err);
      throw new Error('Could not fetching products');
    }
  }

  async createNewProduct(product: Product) {
    return this.productsRepository.save(product);
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async modifyProduct(id: string, updateData: Partial<Product>) {
    const productUpdated = await this.productsRepository.update(id, updateData);

    if (!productUpdated)
      throw new NotFoundException('No se encontro el producto para actualizar');

    return productUpdated;
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productsRepository.delete(id);

    if (!deletedProduct)
      throw new NotFoundException('Product to delete does not exist');

    return deletedProduct;
  }
}

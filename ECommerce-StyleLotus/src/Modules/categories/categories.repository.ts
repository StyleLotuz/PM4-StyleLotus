import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../helpers/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategories() {
    try {
      for (const dato of data) {
        const existingCategory = await this.categoriesRepository
          .createQueryBuilder('category')
          .where('category.name = :name', { name: dato.category })
          .getOne();

        if (!existingCategory) {
          const category = this.categoriesRepository.create({
            name: dato.category,
          });
          await this.categoriesRepository.save(category);
        }
      }
    } catch (error) {
      console.log('Error al importar o procesar el archivo data.json:', error);
      throw new Error('Error importando el data.json');
    }
  }

  async getCategories() {
    const allCategories = this.categoriesRepository.find();
    return allCategories;
  }
}

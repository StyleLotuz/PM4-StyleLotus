import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  addCategories() {
    this.categoriesRepository.addCategories();
  }

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }
}

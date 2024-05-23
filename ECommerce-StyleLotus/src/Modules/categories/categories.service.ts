import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  addCategories(id: string, item: Category) {
    this.categoriesRepository.addCategories(id, item);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }
}

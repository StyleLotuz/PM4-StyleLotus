import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addCategories(id: string, item: Category) {
    const newCategory = await this.categoriesRepository.save(item);
    return newCategory;
  }

  async getCategories() {
    const allCategories = this.categoriesRepository.find();
    return allCategories;
  }
}

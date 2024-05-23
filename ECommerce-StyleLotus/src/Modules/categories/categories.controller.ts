import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesData } from 'src/helpers/categories';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Get('seeder')
  async seedCategories() {
    for (const category of categoriesData) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const newCategory = new Category();
        newCategory.name = category.name;
        await this.categoryRepository.save(newCategory);
      }
    }
    return { message: 'Categories seeded successfully' };
  }
}

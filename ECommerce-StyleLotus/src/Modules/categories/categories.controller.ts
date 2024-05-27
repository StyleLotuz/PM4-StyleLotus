import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService){}

  @Get()
  getAllCategories(){
    return this.categoriesService.getCategories()
  }

  @Get('seeder')
  seedCategories() {
    return this.categoriesService.addCategories()
  }
}

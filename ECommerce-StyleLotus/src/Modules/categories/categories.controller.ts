import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Categories')
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

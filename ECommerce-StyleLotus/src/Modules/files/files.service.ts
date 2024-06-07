import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      const uploadResult = await this.cloudinaryService.uploadImage(file);

      product.imgUrl = uploadResult.secure_url;
      return await this.productsRepository.save(product);
    } catch (err) {
      throw new BadRequestException(`Error updating the image ${err}`);
    }
  }

  
}

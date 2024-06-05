import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryConfig, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}

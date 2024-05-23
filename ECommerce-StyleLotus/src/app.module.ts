import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { ProductsModule } from './Modules/products/products.module';
import { AuthModule } from './Modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Modules/categories/categories.module';
import { OrdersModule } from './Modules/orders/orders.module';
import axios from 'axios';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      await axios.get('http://localhost:3000/categories/seeder');
      await axios.get('http://localhost:3000/products/seeder');
      console.log('Data loaded succesfully');
    } catch (err) {
      console.error('There was an error loading the data', err.message);
      throw new Error('Error loading data');
    }
  }
}

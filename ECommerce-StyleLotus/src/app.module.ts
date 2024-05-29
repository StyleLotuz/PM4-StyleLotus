import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { ProductsModule } from './Modules/products/products.module';
import { AuthModule } from './Modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Modules/categories/categories.module';
import { OrdersModule } from './Modules/orders/orders.module';
import { FilesModule } from './Modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

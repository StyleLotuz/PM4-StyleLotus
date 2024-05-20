import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { ProductsModule } from './Modules/products/products.module';
import { AuthModule } from './Modules/auth/auth.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

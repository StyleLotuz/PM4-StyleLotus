import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/product.entity";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID('4')
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Product[]>
}
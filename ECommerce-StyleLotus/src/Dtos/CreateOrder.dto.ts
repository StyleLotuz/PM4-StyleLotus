import {
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/entities/product.entity';

<<<<<<< Updated upstream
export class CreateOrderDto{
    /** 
     * El user ID debe ser de tipo UUID
     * @example: 3f9d7cda-5d6c-4c3d-8a1e-2d8f4b5e5c29
    */
    @IsNotEmpty()
    @IsUUID('4')
    userId: string;

    /** 
     * Debe ser un Array con los productos por su uuid
     * @example: "products": [
    {"id": "7d4005f8-b74d-4d7d-884a-9b2b4a201f45"},
    {"id": "72f0fc69-8a58-44e1-b3c4-5a3be4e4d010"},
    {"id": "f0197798-514b-45a2-915d-177c79a69d0b"},
    {"id": "5b345a9c-1f1c-4b23-8b5e-71c69d448e11"},
    {"id": "cd37b72e-f0b1-456d-ae1e-f0ac90d21c61"}
  ]
    */
    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Product[]>
}
=======
export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  products: Partial<Product[]>;

  @IsEmpty()
  isAdmin?: boolean;
}
>>>>>>> Stashed changes

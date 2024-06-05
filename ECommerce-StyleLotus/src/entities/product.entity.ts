import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('products')
export class Product {
  /**
   * El ID debe ser de tipo UUID.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * El nombre del producto.
   * @example 'Camiseta'
   */
  @Column({ length: 50, nullable: false })
  name: string;

  /**
   * La descripción del producto.
   * @example 'Una camiseta de algodón con estampado de león.'
   */
  @Column({ nullable: false })
  description: string;

  /**
   * El precio del producto.
   * @example 25.99
   */
  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  /**
   * La cantidad en stock del producto.
   * @example 100
   */
  @Column({ nullable: false })
  stock: number;

  /**
   * La URL de la imagen del producto.
   * @example 'https://example.com/product-image.png'
   */
  @Column({ default: 'https://static.thenounproject.com/png/4974686-200.png' })
  imgUrl: string;

  /**
   * La categoría a la que pertenece este producto.
   * @example { id: '123e4567-e89b-12d3-a456-426614174001', name: 'Ropa' }
   */
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  /**
   * Los detalles de los pedidos en los que este producto ha sido incluido.
   * @example [{ id: '123e4567-e89b-12d3-a456-426614174002', price: 25.99, quantity: 2 }]
   */
  @ManyToMany(() => OrderDetail, (orderdetail) => orderdetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}

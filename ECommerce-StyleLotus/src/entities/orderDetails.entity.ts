import { Order } from './orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';

@Entity('OrderDetails')
export class OrderDetail {
  /**
   * El ID debe ser de tipo UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * El precio total del detalle del pedido.
   * @example 50.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * El pedido al que pertenece este detalle.
   */
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn()
  order: Order;

  /**
   * Los productos incluidos en este detalle de pedido.
   */
  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}

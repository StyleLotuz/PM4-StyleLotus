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
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, order => order.orderDetail)
  @JoinColumn()
  order: Order;

  @ManyToMany(()=> Product, product => product.orderDetails)
  products: Product[]
}

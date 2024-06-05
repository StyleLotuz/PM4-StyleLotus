import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('orders')
export class Order {
  /**
   * El ID debe ser de tipo UUID.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * El usuario que realizó este pedido.
   * @example { id: '123e4567-e89b-12d3-a456-426614174001', name: 'John Doe' }
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  /**
   * La fecha en que se realizó el pedido.
   * @example '2024-06-06T08:00:00.000Z'
   */
  @Column()
  date: Date;

  /**
   * El detalle específico de este pedido.
   * @example { id: '123e4567-e89b-12d3-a456-426614174002', price: 100, products: [...] }
   */
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetail;
}

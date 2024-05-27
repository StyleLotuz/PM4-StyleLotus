import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetail;
}

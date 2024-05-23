import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ default: 'https://static.thenounproject.com/png/4974686-200.png' })
  imgUrl: string;

  @OneToOne(() => Category, (category) => category.product)
  category_id: Category;

  @ManyToMany(() => OrderDetail)
  @JoinTable()
  orderDetails: OrderDetail[];
}

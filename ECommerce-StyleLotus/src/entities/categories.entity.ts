import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false, type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product;
}

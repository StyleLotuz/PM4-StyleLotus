import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  /**
   * El ID debe ser de tipo UUID.
   * @example "3f9d7cda-5d6c-4c3d-8a1e-2d8f4b5e5c29"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * El nombre de la categoría.
   * @example "Electrónicos"
   */
  @Column({ length: 50, nullable: false, type: 'varchar', unique: true })
  name: string;

  /**
   * Los productos asociados a esta categoría.
   */
  @OneToMany(() => Product, (product) => product.category)
  products: Product;
}

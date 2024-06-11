import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  /**
   * El ID debe ser de tipo UUID.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * El nombre del usuario.
   * @example 'John Doe'
   */
  @Column({ length: 50, nullable: false })
  name: string;

  /**
   * El email del usuario, debe ser único.
   * @example 'john@example.com'
   */
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  /**
   * La contraseña del usuario.
   * @example 'P@ssw0rd'
   */
  @Column({ length: 60, nullable: false })
  password: string;

  /**
   * El número de teléfono del usuario.
   * @example 1234567890
   */
  @Column('bigint')
  phone: number;

  /**
   * El país del usuario.
   * @example 'United States'
   */
  @Column({ length: 50 })
  country?: string;

  /**
   * La dirección del usuario.
   * @example '123 Main Street'
   */
  @Column()
  address: string;

  /**
   * La ciudad del usuario.
   * @example 'New York'
   */
  @Column({ length: 50 })
  city?: string;

  /**
   * Indica si el usuario es administrador o no.
   * @example true
   */
  @Column({ default: false, name: 'isAdmin' })
  isAdmin: boolean;

  /**
   * Los pedidos realizados por este usuario.
   * @example [{ id: '123e4567-e89b-12d3-a456-426614174001', date: '2024-06-06', ... }]
   */
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

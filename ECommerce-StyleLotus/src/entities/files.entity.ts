import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'file' })
export class File {
  /**
   * El ID debe ser de tipo número.
   * @example 1
   */
  @ApiProperty({
    name: 'id',
    description: 'Debe ser de tipo número',
  })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * El nombre del archivo.
   * @example "documento.png"
   */
  @Column()
  name: string;

  /**
   * El tipo MIME del archivo.
   * @example "application/png"
   */
  @Column()
  mimeType: string;

  /**
   * Los datos del archivo en formato binario.
   */
  @Column({ type: 'bytea' })
  data: Buffer;
}

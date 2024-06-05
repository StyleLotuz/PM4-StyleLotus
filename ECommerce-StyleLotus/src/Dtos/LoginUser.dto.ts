import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * El correo electrónico del usuario.
   * @example "usuario@example.com"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * La contraseña del usuario.
   * @example "Contraseña123"
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}

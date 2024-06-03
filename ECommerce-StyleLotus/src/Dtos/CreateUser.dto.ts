import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  max,
} from 'class-validator';

export class CreateUserDto {
   /**
   * Nombre del usuario.
   * Debe ser una cadena de texto de al menos 3 caracteres y máximo 80 caracteres.
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;


  /**
   * Correo electrónico del usuario.
   * Debe ser una dirección de correo electrónico válida.
   * @example 'john@example.com'
   */ 
  @IsNotEmpty()
  @IsEmail()
  email: string;


  /**
   * Contraseña del usuario.
   * Debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.
   * @example 'Password123!'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*',
  })
  password: string;


  /**
   * Confirmación de la contraseña del usuario.
   * Debe coincidir con la contraseña.
   * @example 'Password123!'
   */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  confirmPassword: string;


  /**
   * Dirección del usuario.
   * Debe ser una cadena de texto de al menos 3 caracteres y máximo 80 caracteres.
   * @example '123 Street Name'
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Teléfono del usuario.
   * Debe ser un número.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * País del usuario.
   * Debe ser una cadena de texto de al menos 5 caracteres y máximo 20 caracteres.
   * @example 'United States'
   */
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

/**
   * Ciudad del usuario.
   * Debe ser una cadena de texto de al menos 5 caracteres y máximo 20 caracteres.
   * @example 'New York'
   */
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

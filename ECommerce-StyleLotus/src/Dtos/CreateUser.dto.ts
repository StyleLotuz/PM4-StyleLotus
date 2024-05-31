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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  confirmPassword: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, max } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, { message: 'name must contain at least one lowercase letter, one uppercase letter, one number, and one special character: !@#$%^&*' })
    password: string

    @IsString()
    @Length(3,80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @Length(5,20)
    country: string

    @IsString()
    @Length(5,20)
    city: string
}
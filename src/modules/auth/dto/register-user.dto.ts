import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  first_name: string;
  
  @IsNotEmpty()
  last_name: string;
  
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  @IsEnum(['user', 'manager'])
  role: string;
}
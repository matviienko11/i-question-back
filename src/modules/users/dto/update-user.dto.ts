import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  profile_image: string;
  
  @IsOptional()
  first_name: string;
  
  @IsOptional()
  last_name: string;
  
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}
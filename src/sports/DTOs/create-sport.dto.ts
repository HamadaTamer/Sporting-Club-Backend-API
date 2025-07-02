import { IsString, IsEnum, IsDecimal, IsNumber } from 'class-validator';

export class CreateSportDto {
  @IsString()
  name: string;

  @IsDecimal()
  subscription_price: number;

  @IsEnum(['male', 'female', 'mix'])
  allowed_gender: 'male' | 'female' | 'mix';
}

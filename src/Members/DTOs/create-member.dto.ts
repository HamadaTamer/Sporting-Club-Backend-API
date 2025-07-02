import { IsString, IsEnum, IsDateString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @IsDateString()
  birthdate: string;

  @IsDateString()
  subscription_date: string;
}

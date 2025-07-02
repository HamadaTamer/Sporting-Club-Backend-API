import { IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  member_id: number;

  @IsNumber()
  sport_id: number;

  @IsEnum(['group', 'private'])
  subscription_type: 'group' | 'private';

  @IsDateString()
  subscription_date: string;
}

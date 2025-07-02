import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './Entities/subscription.entity';
import { MembersModule } from '../Members/members.module'; // Add this import
import { SportsModule } from '../sports/sports.module'; // Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    MembersModule, // Add this
    SportsModule, // Add this
  ],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
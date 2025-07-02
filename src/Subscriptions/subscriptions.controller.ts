import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './DTOs/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // Subscribe a member to a sport
  @Post()
  subscribeToSport(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.subscribeToSport(createSubscriptionDto);
  }

  // Unsubscribe a member from a sport
  @Delete(':memberId/:sportId')
  unsubscribeFromSport(
    @Param('memberId') memberId: number,
    @Param('sportId') sportId: number,
  ) {
    return this.subscriptionsService.unsubscribeFromSport(memberId, sportId);
  }
}

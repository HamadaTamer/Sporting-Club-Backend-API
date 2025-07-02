import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './Entities/subscription.entity';
import { Member } from '../Members/Entities/member.entity';
import { Sport } from '../sports/Entities/sport.entity';
import { CreateSubscriptionDto } from './DTOs/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,

    @InjectRepository(Member)
    private membersRepository: Repository<Member>,

    @InjectRepository(Sport)
    private sportsRepository: Repository<Sport>,
  ) {}

  // Subscribe a member to a sport
  async subscribeToSport(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const { member_id, sport_id, subscription_type, subscription_date } = createSubscriptionDto;

    // Check if the member exists
    const member = await this.membersRepository.findOne({ where: { id: member_id } });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    // Check if the sport exists
    const sport = await this.sportsRepository.findOne({ where: { id: sport_id } });
    if (!sport) {
      throw new NotFoundException('Sport not found');
    }

    // Ensure that the member is not already subscribed to the same sport
    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { member: { id: member_id }, sport: { id: sport_id } },
    });
    if (existingSubscription) {
      throw new NotFoundException('Member is already subscribed to this sport');
    }

    // Create a new subscription
    const subscription = this.subscriptionsRepository.create({
      member,
      sport,
      subscription_type,
      subscription_date,
    });

    return await this.subscriptionsRepository.save(subscription); // Save the new subscription
  }

  // Unsubscribe a member from a sport
  async unsubscribeFromSport(memberId: number, sportId: number): Promise<void> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { member: { id: memberId }, sport: { id: sportId } },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    await this.subscriptionsRepository.remove(subscription); // Remove the subscription from the repository
  }
}

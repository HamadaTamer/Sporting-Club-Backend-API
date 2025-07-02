import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './Entities/subscription.entity';
import { Member } from '../Members/Entities/member.entity';
import { Sport } from '../sports/Entities/sport.entity';
import { CreateSubscriptionDto } from './DTOs/create-subscription.dto';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let subRepo: Repository<Subscription>;
  let memberRepo: Repository<Member>;
  let sportRepo: Repository<Sport>;

  // Create mock entities
  const mockMember: Member = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'male',
    birthdate: '1990-01-01',
    subscription_date: '2023-01-01',
    subscriptions: []
  };

  const mockSport: Sport = {
    id: 1,
    name: 'Tennis',
    subscription_price: 50,
    allowed_gender: 'mix',
    subscriptions: []
  };

  const mockSubscription: Subscription = {
    id: 1,
    member: mockMember,
    sport: mockSport,
    subscription_date: '2023-01-01',
    subscription_type: 'group'
  };

  const createDto: CreateSubscriptionDto = {
    member_id: 1,
    sport_id: 1,
    subscription_type: 'group',
    subscription_date: '2023-01-01'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockReturnValue(mockSubscription),
            save: jest.fn().mockResolvedValue(mockSubscription),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Member),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockMember),
          },
        },
        {
          provide: getRepositoryToken(Sport),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockSport),
          },
        },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
    subRepo = module.get<Repository<Subscription>>(getRepositoryToken(Subscription));
    memberRepo = module.get<Repository<Member>>(getRepositoryToken(Member));
    sportRepo = module.get<Repository<Sport>>(getRepositoryToken(Sport));
  });

  it('should subscribe member to sport', async () => {
    jest.spyOn(subRepo, 'findOne').mockResolvedValue(null); // No existing subscription
    
    const result = await service.subscribeToSport(createDto);
    
    expect(result).toEqual(mockSubscription);
    expect(memberRepo.findOne).toHaveBeenCalledWith({ where: { id: createDto.member_id } });
    expect(sportRepo.findOne).toHaveBeenCalledWith({ where: { id: createDto.sport_id } });
    expect(subRepo.create).toHaveBeenCalledWith({
      member: mockMember,
      sport: mockSport,
      subscription_type: createDto.subscription_type,
      subscription_date: createDto.subscription_date
    });
  });
});
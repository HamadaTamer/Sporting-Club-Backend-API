import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsService } from './sports.service';
import { Sport } from './Entities/sport.entity';

describe('SportsService', () => {
  let service: SportsService;
  let repo: Repository<Sport>;

  const mockSport = {
    id: 1,
    name: 'Tennis',
    subscription_price: 50,
    allowed_gender: 'mix'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportsService,
        {
          provide: getRepositoryToken(Sport),
          useValue: {
            find: jest.fn().mockResolvedValue([mockSport]),
            findOne: jest.fn().mockResolvedValue(mockSport),
            create: jest.fn().mockReturnValue(mockSport),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SportsService>(SportsService);
    repo = module.get<Repository<Sport>>(getRepositoryToken(Sport));
  });

  it('should return all sports', async () => {
    expect(await service.findAll()).toEqual([mockSport]);
    expect(repo.find).toHaveBeenCalled();
  });

  // Add more test cases
});
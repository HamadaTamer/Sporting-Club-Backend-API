import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembersService } from './members.service';
import { Member } from './Entities/member.entity';
import { CreateMemberDto } from './DTOs/create-member.dto';

describe('MembersService', () => {
  let service: MembersService;
  let repo: Repository<Member>;

  const mockMember: Member = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'male',
    birthdate: '1990-01-01',
    subscription_date: '2023-01-01',
    subscriptions: []
  };

  const createDto: CreateMemberDto = {
    first_name: 'John',
    last_name: 'Doe',
    gender: 'male',
    birthdate: '1990-01-01',
    subscription_date: '2023-01-01'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getRepositoryToken(Member),
          useValue: {
            create: jest.fn().mockReturnValue(mockMember),
            save: jest.fn().mockResolvedValue(mockMember),
            find: jest.fn().mockResolvedValue([mockMember]),
            findOne: jest.fn().mockResolvedValue(mockMember),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    repo = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('should create a member', async () => {
    const result = await service.create(createDto);
    expect(result).toEqual(mockMember);
    expect(repo.create).toHaveBeenCalledWith(createDto);
    expect(repo.save).toHaveBeenCalledWith(mockMember);
  });
});
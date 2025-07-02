import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../Members/Entities/member.entity';
import { Sport } from '../../sports/Entities/sport.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedMembers();
    await this.seedSports();
  }

  private async seedMembers() {
    const count = await this.memberRepository.count();
    if (count === 0) {
      await this.memberRepository.insert([
        {
          first_name: 'John',
          last_name: 'Doe',
          gender: 'male',
          birthdate: '1990-01-15',
          subscription_date: '2023-01-01'
        },
        {
          first_name: 'Jane',
          last_name: 'Smith',
          gender: 'female',
          birthdate: '1992-05-20',
          subscription_date: '2023-02-01'
        }
      ]);
      console.log('Members seeded!');
    }
  }

  private async seedSports() {
    const count = await this.sportRepository.count();
    if (count === 0) {
      await this.sportRepository.insert([
        {
          name: 'Tennis',
          subscription_price: 50,
          allowed_gender: 'mix'
        },
        {
          name: 'Swimming',
          subscription_price: 40,
          allowed_gender: 'female'
        }
      ]);
      console.log('Sports seeded!');
    }
  }
}
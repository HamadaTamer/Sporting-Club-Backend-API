import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Member } from '../../Members/Entities/member.entity';

export default class MemberSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Member);
    
    await repository.insert([
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
  }
}
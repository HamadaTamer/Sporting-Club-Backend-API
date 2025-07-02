import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Sport } from '../../sports/Entities/sport.entity';

export default class SportSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Sport);
    
    await repository.insert([
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
  }
}
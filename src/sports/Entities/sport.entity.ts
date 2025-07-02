import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subscription } from '../../Subscriptions//Entities/subscription.entity';  // Import Subscription entity

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  subscription_price: number;

  @Column()
  allowed_gender: 'male' | 'female' | 'mix';

  // One sport can have many subscriptions (for multiple members)
  @OneToMany(() => Subscription, (subscription) => subscription.sport)
  subscriptions: Subscription[];  // This represents all subscriptions for this sport
}

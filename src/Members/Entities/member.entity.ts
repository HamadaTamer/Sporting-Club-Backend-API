import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subscription } from '../../Subscriptions/Entities/subscription.entity';  // Import Subscription entity

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: 'male' | 'female';

  @Column('date')
  birthdate: string;

  @Column('date')
  subscription_date: string;

  // Many subscriptions for one member
  @OneToMany(() => Subscription, (subscription) => subscription.member)
  subscriptions: Subscription[];  // This represents all subscriptions the member has
}

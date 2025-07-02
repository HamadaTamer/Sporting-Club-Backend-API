import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Member } from '../../Members/Entities/member.entity';
import { Sport } from '../../sports/Entities/sport.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.subscriptions)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Sport, (sport) => sport.subscriptions)
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @Column('date')
  subscription_date: string;

  @Column('varchar')
  subscription_type: 'group' | 'private'; 
}

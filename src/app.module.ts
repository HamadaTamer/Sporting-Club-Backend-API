import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // For TypeORM integration
import { ConfigModule } from '@nestjs/config';  // Ensure ConfigModule is imported
import { MembersModule } from './Members/members.module'; // Import MembersModule
import { SportsModule } from './sports/sports.module'; // Import SportsModule
import { SubscriptionsModule } from './Subscriptions/subscriptions.module'; // Import SubscriptionsModule
import { Member } from './Members/Entities/member.entity';
import { Sport } from './sports/Entities/sport.entity';
import { Subscription } from './Subscriptions/Entities/subscription.entity';
import { SeederService } from './database/seeds/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Configure the ConfigModule to load .env globally
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Use the full connection URL
      entities: [Member, Sport, Subscription],
      synchronize: true,
      ssl: true, // Supabase requires SSL
      extra: {
        ssl: {
          rejectUnauthorized: false // For self-signed certificates
        }
      }
    }),

    MembersModule,        // Register the MembersModule
    SportsModule,         // Register the SportsModule
    SubscriptionsModule,  // Register the SubscriptionsModule
  ],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}

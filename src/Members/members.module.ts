import { Module } from '@nestjs/common';
import { MembersService } from './members.service'; 
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { Member } from './Entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],  
  providers: [MembersService],  
  controllers: [MembersController], 
  exports:[TypeOrmModule.forFeature([Member])]
})
export class MembersModule {}

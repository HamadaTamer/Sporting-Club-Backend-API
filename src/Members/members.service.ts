import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './Entities/member.entity';
import { CreateMemberDto } from './DTOs/create-member.dto';
import { UpdateMemberDto } from './DTOs/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(member);
  }

  async findAll() {
    return this.membersRepository.find();  // Simple find all query
  }
  
   async findById(id: number): Promise<Member> {
      const member = await this.membersRepository.findOne({
        where: { id },  
      });

      if (!member) {
        throw new NotFoundException('Member not found');
      }
      return member;
    }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.membersRepository.findOne({
      where: { id },  // Specify the `id` using the `where` clause
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    Object.assign(member, updateMemberDto);  // Update the Member object with the new values
    return this.membersRepository.save(member);  // Save the updated Member
  }

  async delete(id: number): Promise<void> {
    const member = await this.membersRepository.findOne({
      where: { id },  // Specify the `id` using the `where` clause
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    await this.membersRepository.remove(member);  // Remove the Member from the repository
  }


  
}


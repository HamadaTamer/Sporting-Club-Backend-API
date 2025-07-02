import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './Entities/sport.entity';
import { CreateSportDto } from './DTOs/create-sport.dto';
import { UpdateSportDto } from './DTOs/update-sport.dto';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private sportsRepository: Repository<Sport>,
  ) {}

  async create(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportsRepository.create(createSportDto);
    return this.sportsRepository.save(sport);
  }

  async findAll() {
    return this.sportsRepository.find();  // Simple find all query
  }
  
  async update(id: number, updateSportDto: UpdateSportDto): Promise<Sport> {
    const sport = await this.sportsRepository.findOne({
      where: { id },  // Specify the `id` using the `where` clause
    });

    if (!sport) {
      throw new NotFoundException('Sport not found');
    }

    Object.assign(sport, updateSportDto);  // Update the sport object with the new values
    return this.sportsRepository.save(sport);  // Save the updated sport
  }

  async delete(id: number): Promise<void> {
    const sport = await this.sportsRepository.findOne({
      where: { id },  // Specify the `id` using the `where` clause
    });

    if (!sport) {
      throw new NotFoundException('Sport not found');
    }

    await this.sportsRepository.remove(sport);  // Remove the sport from the repository
  }


}


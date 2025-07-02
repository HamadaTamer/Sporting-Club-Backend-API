import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './DTOs/create-sport.dto';
import { UpdateSportDto } from './DTOs/update-sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Post()
  createSport(@Body() createSportDto: CreateSportDto) {
    return this.sportsService.create(createSportDto);
  }

  @Get()
  getAllSports() {
    return this.sportsService.findAll();
  }

  @Put(':id')
  updateSport(@Param('id') id: number, @Body() updateSportDto: UpdateSportDto) {
    return this.sportsService.update(id, updateSportDto);
  }

   @Delete(':id')
  deleteSport(@Param('id') id: number) {
    return this.sportsService.delete(id);
  }
}

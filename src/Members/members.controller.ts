import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './DTOs/create-member.dto';
import { UpdateMemberDto } from './DTOs/update-member.dto';

@Controller('member')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  getAllMembers() {
    return this.membersService.findAll();
  }

  @Put(':id')
  updateMember(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

   @Delete(':id')
  deleteMember(@Param('id') id: number) {
    return this.membersService.delete(id);
  }


  @Get(':id')
  getMember(@Param('id') id: number) {
    return this.membersService.findById(id);
  }
}

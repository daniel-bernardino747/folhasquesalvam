import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { MembersService } from './members.service';

import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberEntity } from './entities/member.entity';

import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/roles.decorator';

@Controller('api/members')
@ApiTags('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Roles(Role.DIRECTOR)
  @ApiCreatedResponse({ type: MemberEntity })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: MemberEntity, isArray: true })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MemberEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const member = await this.membersService.findOne(+id);

    if (!member) {
      throw new NotFoundException(`Member with id: ${id} not found`);
    }
    return member;
  }

  @Patch(':id')
  @Roles(Role.DIRECTOR)
  @ApiOkResponse({ type: MemberEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @Roles(Role.DIRECTOR)
  @ApiOkResponse({ type: MemberEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.remove(+id);
  }
}

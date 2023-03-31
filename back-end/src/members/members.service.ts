import { Injectable } from '@nestjs/common';
import { PrismaService } from '../domain/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMemberDto: CreateMemberDto) {
    return this.prismaService.member.create({ data: createMemberDto });
  }

  findAll() {
    return this.prismaService.member.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.member.findUnique({ where: { id } });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prismaService.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  remove(id: number) {
    return this.prismaService.member.delete({ where: { id } });
  }
}

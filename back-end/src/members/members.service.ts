import { Injectable } from '@nestjs/common';
import { ClerkService } from './../domain/clerk/clerk.service';
import { PrismaService } from '../domain/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return this.prismaService.member.create({
      data: {
        ...createMemberDto,
        Points: {
          create: {
            amount: 0,
          },
        },
      },
    });
  }

  async findAll() {
    const clerkIdByPhoto: MapMemberWithProfileImage = new Map();
    const members = await this.prismaService.member.findMany({
      include: { User: { select: { idClerk: true } } },
    });

    const users = await this.clerkService.users.getUserList();

    for (let i = 0; i < members.length; i++) {
      const memberWithoutPhoto = members[i];
      const {
        User: { idClerk },
      } = memberWithoutPhoto;

      if (!clerkIdByPhoto.has(idClerk)) {
        clerkIdByPhoto.set(idClerk, memberWithoutPhoto);
      }
    }

    for (let j = 0; j < users.length; j++) {
      const userClerk = users[j];
      if (clerkIdByPhoto.has(userClerk.id)) {
        const memberWithoutPhoto = clerkIdByPhoto.get(userClerk.id);

        delete memberWithoutPhoto.User;
        clerkIdByPhoto.set(userClerk.id, {
          ...memberWithoutPhoto,
          name: `${userClerk.firstName} ${userClerk.lastName}`,
          profileImageUrl: userClerk.profileImageUrl,
        });
      }
    }

    return [...clerkIdByPhoto.values()];
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

type MemberWithProfileImage = Member & {
  User: {
    idClerk: string;
  };
  name?: string;
  profileImageUrl?: string;
};

type MapMemberWithProfileImage = Map<string, MemberWithProfileImage>;

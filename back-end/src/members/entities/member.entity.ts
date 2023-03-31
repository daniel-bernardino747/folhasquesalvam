import { ApiProperty } from '@nestjs/swagger';
import { Member, Role } from '@prisma/client';

export class MemberEntity implements Member {
  @ApiProperty()
  id: number;

  @ApiProperty()
  teamId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

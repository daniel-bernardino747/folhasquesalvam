import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  teamId: number;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ default: 'USER' })
  role: Role = 'USER';
}

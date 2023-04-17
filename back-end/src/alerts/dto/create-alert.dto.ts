import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlertDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  memberId?: number;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty()
  role?: Role;

  @IsString()
  @ApiProperty()
  alertType: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isResolved?: boolean = false;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  resolvedDate?: Date = new Date();

  @IsDate()
  @IsOptional()
  @ApiProperty()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  updatedAt?: Date;
}

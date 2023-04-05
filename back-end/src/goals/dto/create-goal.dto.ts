import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  memberId: number;

  @IsDate()
  @ApiProperty()
  deliveryDate: Date;

  @IsOptional()
  @ApiProperty({ default: 'false' })
  completed = false;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { MinDateToday } from './decorator/validation.decorator';
import { Type } from 'class-transformer';

class MembersIds {
  @IsNumber()
  @ApiProperty()
  memberId: number;
}

export class CreateGoalDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MembersIds)
  @ApiProperty({ type: [MembersIds] })
  membersIds: MembersIds[];

  @IsDateString()
  @MinDateToday()
  @ApiProperty()
  deliveryDate: Date;

  @IsOptional()
  @ApiProperty({ default: 'DO' })
  status: 'DO' | 'DONE' | 'PROGRESS' | 'REVIEW' = 'DO';

  @IsOptional()
  @ApiProperty({ default: 'LOW' })
  difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
}

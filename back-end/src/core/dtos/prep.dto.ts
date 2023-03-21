import { IsString, IsNotEmpty, IsNumber, IsJSON } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePrepDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  folderId: number;
}

export class UpdatePrepDto extends PartialType(CreatePrepDto) {}

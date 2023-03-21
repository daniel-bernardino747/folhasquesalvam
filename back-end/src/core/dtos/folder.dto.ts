import { IsString, IsNotEmpty, IsNumber, IsJSON } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFolderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  size: number;

  @IsJSON()
  @IsNotEmpty()
  content: string;
}

export class UpdateFolderDto extends PartialType(CreateFolderDto) {}

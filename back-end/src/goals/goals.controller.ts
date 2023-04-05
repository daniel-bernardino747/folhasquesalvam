import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('api/goals')
@ApiTags('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(':memberId/member')
  findOne(@Param('id') id: string) {
    return this.goalsService.findAllByMemberId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(+id, updateGoalDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.goalsService.complete(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(+id);
  }
}

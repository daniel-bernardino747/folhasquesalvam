import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/roles.decorator';

@Controller('/api/alerts')
@ApiTags('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @Roles(Role.TEAM, Role.LEADER, Role.DIRECTOR, Role.AMBASSADOR, Role.ALUMNI)
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':memberId/member')
  findOneByUserId(@Param('memberId') id: string) {
    return this.alertsService.findOneByUserId(+id);
  }

  @Get(':memberId/pending')
  findPending(@Param('memberId') id: string) {
    return this.alertsService.findPending(+id);
  }

  @Patch(':id')
  @Roles(Role.TEAM, Role.LEADER, Role.DIRECTOR, Role.AMBASSADOR, Role.ALUMNI)
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    const { isResolved } = updateAlertDto;
    return this.alertsService.update(+id, isResolved);
  }

  @Delete(':id')
  @Roles(Role.DIRECTOR)
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}

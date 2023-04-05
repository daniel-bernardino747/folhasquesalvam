import { ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from 'src/roles.decorator';
import { PointsService } from './points.service';

type RequestAuth = Request & { user: User };

@Controller('api/points')
@ApiTags('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('all')
  @Roles(Role.ALUMNI, Role.AMBASSADOR, Role.TEAM)
  findOne(@Req() request: RequestAuth) {
    const user = request.user;

    return this.pointsService.findAll(+user.id);
  }
}

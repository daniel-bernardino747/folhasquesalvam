import { PrismaService } from './../domain/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PointsService } from 'src/points/points.service';
import { Role, Roles } from 'src/roles.decorator';

@Injectable()
export class GoalsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly pointsService: PointsService,
  ) {}

  @Roles(Role.DIRECTOR, Role.LEADER)
  create(createGoalDto: CreateGoalDto) {
    const { membersIds, ...args } = createGoalDto;
    return this.prismaService.goal.create({
      data: {
        ...args,
        MemberGoal: {
          createMany: { data: membersIds },
        },
      },
    });
  }

  @Roles(Role.DIRECTOR)
  findAll() {
    return this.prismaService.goal.findMany({ include: { MemberGoal: true } });
  }

  @Roles(Role.DIRECTOR, Role.LEADER, Role.TEAM)
  findAllByMemberId(id: number) {
    return this.prismaService.goal.findMany({
      where: {
        MemberGoal: {
          every: {
            id,
          },
        },
      },
    });
  }

  @Roles(Role.DIRECTOR, Role.LEADER, Role.TEAM)
  update(id: number, updateGoalDto: UpdateGoalDto) {
    return this.prismaService.goal.update({
      data: updateGoalDto,
      where: {
        id,
      },
    });
  }
  @Roles(Role.DIRECTOR)
  async complete(id: number) {
    const goalCompleted = await this.prismaService.goal.update({
      data: {
        status: 'DONE',
      },
      where: {
        id,
      },
      include: {
        MemberGoal: true,
      },
    });

    return this.pointsService.addPoints(goalCompleted);
  }

  @Roles(Role.DIRECTOR)
  remove(id: number) {
    return this.prismaService.goal.delete({ where: { id } });
  }
}

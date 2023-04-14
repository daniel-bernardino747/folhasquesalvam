import { PrismaService } from './../domain/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PointsService } from 'src/points/points.service';
import { Role, Roles } from 'src/roles.decorator';
import { Goal } from '@prisma/client';
import { statusToLabelMapping } from './types/statusToLabelMapping';
import { Label } from './types/Label';

type GoalWithLabel = Goal & { label: Label[keyof Label] };

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
  async findAllByMemberId(id: number) {
    const goals = await this.prismaService.goal.findMany({
      where: {
        MemberGoal: {
          every: {
            id,
          },
        },
      },
      include: {
        MemberGoal: {
          select: {
            memberId: true,
          },
        },
      },
    });

    const goalsWithLabel = this.addLabelsToGoals(goals);

    return goalsWithLabel;
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

  private addLabelsToGoals(goals: Goal[]): GoalWithLabel[] {
    return goals.map((goal) => {
      const status = goal.status;

      const label = statusToLabelMapping[status].getLabel(goal);

      label as Label[keyof Label];

      return { ...goal, label };
    });
  }
}

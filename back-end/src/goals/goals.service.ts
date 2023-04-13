import { PrismaService } from './../domain/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PointsService } from 'src/points/points.service';

@Injectable()
export class GoalsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly pointsService: PointsService,
  ) {}

  create(createGoalDto: CreateGoalDto) {
    const { memberId, ...args } = createGoalDto;
    return this.prismaService.goal.create({
      data: {
        ...args,
        MemberGoal: {
          connect: {
            id: memberId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.goal.findMany({ include: { MemberGoal: true } });
  }

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

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return this.prismaService.goal.update({
      data: updateGoalDto,
      where: {
        id,
      },
    });
  }

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

  remove(id: number) {
    return this.prismaService.goal.delete({ where: { id } });
  }
}

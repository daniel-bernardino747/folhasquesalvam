import { PrismaService } from './../domain/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Goal, MemberGoal } from '@prisma/client';

type GoalWithMembers = Goal & { MemberGoal: MemberGoal[] };

@Injectable()
export class PointsService {
  MS_PER_DAY = 1000 * 60 * 60 * 24; // 86400000ms
  POINTS_PER_DAY = 500;
  GROWTH_FACTOR = 0.11;
  constructor(private readonly prismaService: PrismaService) {}

  findAll(memberId: number) {
    return this.prismaService.points.findMany({ where: { memberId } });
  }

  public addPoints(goal: GoalWithMembers) {
    const membersIds = goal.MemberGoal.map((member) => member.memberId);
    const points = this.calculatePointsByDeliveryDuration(
      goal.deliveryDate,
      goal.createdAt,
    );

    return this.prismaService.points.updateMany({
      where: {
        memberId: { in: membersIds },
      },
      data: {
        amount: {
          increment: points,
        },
      },
    });
  }

  private calculatePointsByDeliveryDuration(
    dayDelivered: Date,
    deliveryDate: Date,
  ) {
    if (
      !(dayDelivered instanceof Date && !isNaN(dayDelivered.getTime())) ||
      !(deliveryDate instanceof Date && !isNaN(deliveryDate.getTime()))
    ) {
      throw new Error('The provided dates are not valid.');
    }

    const timeDelta = deliveryDate.getTime() - dayDelivered.getTime();
    const differenceInDays = Math.round(timeDelta / this.MS_PER_DAY);

    if (differenceInDays < 0) {
      throw new Error('The delivery date cannot be before the day delivered.');
    }

    return this.POINTS_PER_DAY * this.growthCurve(differenceInDays);
  }

  private growthCurve(x: number) {
    if (typeof x !== 'number')
      throw new Error('The argument must be a number.');

    return 1.01 ** (this.GROWTH_FACTOR * x);
  }
}

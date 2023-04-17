import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';

import { PrismaService } from '@domain/prisma/prisma.service';
import { Alerts } from '@prisma/client';

@Injectable()
export class AlertsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alerts> {
    let newAlert: Alerts;

    // Check if memberId is provided, create alert for the specified member only
    if (createAlertDto.memberId) {
      newAlert = await this.prismaService.alerts.create({
        data: {
          alertType: createAlertDto.alertType,
          description: createAlertDto.description,
          member: { connect: { id: createAlertDto.memberId } },
        },
      });
    } else if (createAlertDto.role) {
      // Find all members with the specified role and create alert for each one
      const members = await this.prismaService.member.findMany({
        where: { role: createAlertDto.role },
      });

      const alerts = await Promise.all(
        members.map(async (member) => {
          const alert = await this.prismaService.alerts.create({
            data: {
              alertType: createAlertDto.alertType,
              description: createAlertDto.description,
              member: { connect: { id: member.id } },
            },
          });
          return alert;
        }),
      );
      newAlert = alerts[0];
    } else {
      throw new BadRequestException(
        'Either memberId or role must be provided to create an alert.',
      );
    }

    return newAlert;
  }

  async findAll(): Promise<Alerts[]> {
    const alerts = await this.prismaService.alerts.findMany();

    return alerts;
  }

  async findOneByUserId(memberId: number): Promise<Alerts[]> {
    const alerts = await this.prismaService.alerts.findMany({
      where: { memberId },
    });

    if (!alerts) {
      throw new NotFoundException(
        `Alerts not found for member with id ${memberId}`,
      );
    }

    return alerts;
  }

  async findOne(id: number): Promise<Alerts> {
    const alert = await this.prismaService.alerts.findUnique({
      where: { id },
    });

    if (!alert) {
      throw new NotFoundException(`Alerts not found for alert with id ${id}`);
    }

    return alert;
  }

  async findPending(memberId: number): Promise<Alerts[]> {
    const pendingAlerts = await this.prismaService.alerts.findMany({
      where: {
        memberId: memberId,
        isResolved: false,
      },
    });
    return pendingAlerts;
  }

  async update(id: number, isResolved: boolean): Promise<Alerts> {
    await this.findOne(id);

    const updatedAlert = await this.prismaService.alerts.update({
      where: {
        id,
      },
      data: {
        isResolved,
      },
    });

    return updatedAlert;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prismaService.alerts.delete({
      where: {
        id,
      },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { PrismaService } from '@domain/prisma/prisma.service';
import { AlertsService } from './alerts.service';
import { Role } from '@prisma/client';

describe('AlertsService', () => {
  let alertsService: AlertsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AlertsService, PrismaService],
    }).compile();

    alertsService = moduleRef.get<AlertsService>(AlertsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new alert for a specific member', async () => {
      const memberId = 1;
      const createAlertDto = {
        memberId,
        alertType: 'warning',
        description: 'Test alert',
      };
      const createdAlert = await alertsService.create(createAlertDto);

      expect(createdAlert).toHaveProperty('id');
      expect(createdAlert.memberId).toBe(memberId);
      expect(createdAlert.alertType).toBe(createAlertDto.alertType);
      expect(createdAlert.description).toBe(createAlertDto.description);
      expect(createdAlert.isResolved).toBe(false);
    });

    it('should create a new alert for all members with a specific role', async () => {
      const role = Role.DIRECTOR;
      const createAlertDto = {
        alertType: 'warning',
        description: 'Test alert for all members with role DIRECTOR',
        role,
      };
      const members = await prismaService.member.findMany({ where: { role } });
      const createdAlerts = await alertsService.create(createAlertDto);

      expect(createdAlerts).toHaveLength(members.length);
      expect(createdAlerts[0].alertType).toBe(createAlertDto.alertType);
      expect(createdAlerts[0].description).toBe(createAlertDto.description);
      expect(createdAlerts[0].isResolved).toBe(false);
    });

    it('should throw an error if invalid role is provided', async () => {
      const createAlertDto = {
        alertType: 'warning',
        description: 'Test alert for all members with invalid role',
        role: 'INVALID_ROLE' as Role,
      };

      await expect(alertsService.create(createAlertDto)).rejects.toThrow(
        new BadRequestException('Invalid role provided'),
      );
    });

    it('should throw an error if neither memberId nor role is provided', async () => {
      const createAlertDto = {
        alertType: 'warning',
        description: 'Test alert without memberId or role',
      };

      await expect(alertsService.create(createAlertDto)).rejects.toThrow(
        new BadRequestException(
          'Either memberId or role must be provided to create an alert.',
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of alerts', async () => {
      const alerts = await alertsService.findAll();

      expect(Array.isArray(alerts)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return an alert with the specified member id', async () => {
      const alerts = await alertsService.findOne(1);
      expect(alert).toBeDefined();
      expect(Array.isArray(alerts)).toBe(true);
    });

    it('should throw NotFoundException when alert is not found', async () => {
      await expect(alertsService.findOne(999)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update an existing alert', async () => {
      const updateAlertDto = {
        isResolved: true,
      };
      const updatedAlert = await alertsService.update(
        1,
        updateAlertDto.isResolved,
      );
      expect(updatedAlert).toEqual(expect.objectContaining(updateAlertDto));
    });

    it('should throw NotFoundException when alert is not found', async () => {
      const updateAlertDto = {
        isResolved: true,
      };
      await expect(
        alertsService.update(999, updateAlertDto.isResolved),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove an existing alert', async () => {
      await expect(alertsService.remove(1)).resolves.not.toThrow();
      await expect(alertsService.findOne(1)).rejects.toThrowError();
    });

    it('should throw NotFoundException when alert is not found', async () => {
      await expect(alertsService.remove(999)).rejects.toThrowError();
    });
  });
});

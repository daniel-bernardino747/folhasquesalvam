import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

describe('AlertsController', () => {
  let controller: AlertsController;
  let service: AlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [AlertsService],
    }).compile();

    controller = module.get<AlertsController>(AlertsController);
    service = module.get<AlertsService>(AlertsService);
  });

  describe('create', () => {
    it('should create an alert', async () => {
      const alert = {
        id: 1,
        memberId: 1,
        alertType: 'Test Alert',
        description: 'Test Description',
        isResolved: false,
        resolvedDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(alert);

      const createAlertDto = {
        memberId: 1,
        alertType: 'Test Alert',
        description: 'Test Description',
        isResolved: false,
      };

      expect(await controller.create(createAlertDto)).toBe(alert);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { PrismaModule } from '@domain/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}

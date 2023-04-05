import { PrismaModule } from './../domain/prisma/prisma.module';
import { PointsModule } from './../points/points.module';
import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';

@Module({
  imports: [PointsModule, PrismaModule],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}

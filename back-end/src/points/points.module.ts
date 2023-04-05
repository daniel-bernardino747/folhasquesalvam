import { PrismaModule } from './../domain/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PointsController],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}

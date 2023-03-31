import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';

import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { PointsModule } from './points/points.module';

// import { RolesGuard } from './roles.guard';
@Module({
  imports: [MembersModule, UsersModule, GoalsModule, PointsModule],
  controllers: [AppController],
  // providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}

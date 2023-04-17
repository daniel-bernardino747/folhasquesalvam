import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';

import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { PointsModule } from './points/points.module';

import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    MembersModule,
    UsersModule,
    GoalsModule,
    PointsModule,
    AuthModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

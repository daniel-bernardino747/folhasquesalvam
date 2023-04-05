import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { PrismaModule } from './../domain/prisma/prisma.module';
import { ClerkModule } from '../domain/clerk/clerk.module';

@Module({
  imports: [HttpModule, ClerkModule, PrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

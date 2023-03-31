import { Module } from '@nestjs/common';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';

import { ClerkModule } from '../domain/clerk/clerk.module';
import { PrismaModule } from '../domain/prisma/prisma.module';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  imports: [PrismaModule, ClerkModule],
})
export class MembersModule {}

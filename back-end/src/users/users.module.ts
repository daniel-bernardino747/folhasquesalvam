import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ClerkModule } from '../domain/clerk/clerk.module';
import { PrismaModule } from '../domain/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, ClerkModule],
})
export class UsersModule {}

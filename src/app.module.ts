import { Module } from '@nestjs/common';

import { PrepCommand } from './prep.command';

@Module({
  providers: [PrepCommand],
})
export class AppModule {}

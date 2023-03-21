import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { PrepFactoryService } from './prep-factory.service';
import { PrepUseCases } from './prep.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [PrepFactoryService, PrepUseCases],
  exports: [PrepFactoryService, PrepUseCases],
})
export class PrepUseCasesModule {}

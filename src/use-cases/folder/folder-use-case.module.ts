import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { FolderFactoryService } from './folder-factory.service';
import { FolderUseCases } from './folder.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [FolderFactoryService, FolderUseCases],
  exports: [FolderFactoryService, FolderUseCases],
})
export class FolderUseCasesModule {}

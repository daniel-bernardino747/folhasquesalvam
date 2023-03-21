import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../frameworks/data-service/mongo/mongo-data-services.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}

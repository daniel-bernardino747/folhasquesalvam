import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '@core/index';
import { DATA_BASE_CONFIGURATION } from '@config/index';
import {
  User,
  UserSchema,
  Folder,
  FolderSchema,
  Preps,
  PrepsSchema,
} from './model';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Folder.name, schema: FolderSchema },
      { name: Preps.name, schema: PrepsSchema },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../../core';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
  User,
  UserDocument,
  Folder,
  FolderDocument,
  Preps,
  PrepsDocument,
} from './model';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;
  folders: MongoGenericRepository<Folder>;
  preps: MongoGenericRepository<Preps>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Folder.name)
    private FolderRepository: Model<FolderDocument>,
    @InjectModel(Preps.name)
    private PrepsRepository: Model<PrepsDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.folders = new MongoGenericRepository<Folder>(this.FolderRepository, [
      'user',
    ]);
    this.preps = new MongoGenericRepository<Preps>(this.PrepsRepository, [
      'user',
      'folder',
    ]);
  }
}

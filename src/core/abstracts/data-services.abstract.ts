import { User, Folder, Prep } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;

  abstract folders: IGenericRepository<Folder>;

  abstract preps: IGenericRepository<Prep>;
}

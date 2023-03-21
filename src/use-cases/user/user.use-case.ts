import { Injectable } from '@nestjs/common';
import { User, IDataServices, CreateUserDto, UpdateUserDto } from '@core/index';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.dataServices.users.getAll();
  }

  getuserById(id: any): Promise<User> {
    return this.dataServices.users.get(id);
  }

  createuser(createuserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createuserDto);
    return this.dataServices.users.create(user);
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.update(userId, user);
  }
}

import { Injectable } from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto } from '@core/index';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.first_name = createUserDto.firstName;
    newUser.last_name = createUserDto.lastName;

    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User();
    newUser.first_name = updateUserDto.firstName;
    newUser.last_name = updateUserDto.lastName;

    return newUser;
  }
}

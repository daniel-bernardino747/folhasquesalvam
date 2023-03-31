import { Injectable } from '@nestjs/common';
import { ClerkService } from '../domain/clerk/clerk.service';

@Injectable()
export class UsersService {
  constructor(private clerkService: ClerkService) {}

  findAll() {
    return this.clerkService.users.getUserList();
  }

  findOne(id: string) {
    return this.clerkService.users.getUser(id);
  }
}

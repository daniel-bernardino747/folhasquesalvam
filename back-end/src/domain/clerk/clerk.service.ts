import 'dotenv/config';
import clerk from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';
import { UserAPI } from '@clerk/backend/dist/types/api/endpoints';

@Injectable()
export class ClerkService {
  public users: UserAPI;

  constructor() {
    this.users = clerk.users;
  }
}

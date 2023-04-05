import { PrismaService } from '../domain/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Session, User as UserClerk } from '@clerk/clerk-sdk-node';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Role, User } from '@prisma/client';

type UserWithMember = User & { Member: { role: Role }[] };

@Injectable()
export class AuthService {
  private readonly API_URL = 'https://api.clerk.dev/v1';
  private readonly API_KEY =
    'sk_test_xfTkBsXhQAFNNO2OlkskKxTMT4iDiEbiloVI2QncnP';

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.httpService.axiosRef.defaults.baseURL = this.API_URL;
    this.httpService.axiosRef.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.API_KEY}`;
  }

  async verifySessionAndRole(id: string) {
    const { data: session } = await this.getSessionClerk(id);

    let user: UserWithMember = await this.getUserInDatabase(session);

    if (!user) user = await this.registerUser(id);

    return { session, user };
  }

  private async registerUser(id: string) {
    const { data: userClerk } = await this.getUserClerk(id);

    return this.createUser({
      email: userClerk.emailAddresses[0].emailAddress,
      id: userClerk.id,
    });
  }
  private getSessionClerk(id: string) {
    return firstValueFrom(
      this.httpService.get<Session>(`/sessions/${id}`).pipe(
        catchError((error: AxiosError) => {
          switch (error.response.status) {
            case 404:
              throw new NotFoundException(error.response.data);
            default:
              throw new BadRequestException(error.message);
          }
        }),
      ),
    );
  }
  private getUserClerk(id: string) {
    return firstValueFrom(
      this.httpService.get<UserClerk>(`/users/${id}`).pipe(
        catchError((error: AxiosError) => {
          switch (error.response.status) {
            case 404:
              throw new NotFoundException(error.response.data);
            default:
              throw new BadRequestException(error.message);
          }
        }),
      ),
    );
  }
  private getUserInDatabase(session: Session) {
    return this.prismaService.user.findUnique({
      where: {
        idClerk: session.userId,
      },
      include: {
        Member: {
          select: {
            role: true,
          },
        },
      },
    });
  }
  private createUser({ email, id }) {
    return this.prismaService.user.create({
      data: {
        email,
        idClerk: id,
        Member: {
          create: [
            {
              role: 'USER',
              teamId: 1,
            },
          ],
        },
      },
      include: {
        Member: {
          select: {
            role: true,
          },
        },
      },
    });
  }
}

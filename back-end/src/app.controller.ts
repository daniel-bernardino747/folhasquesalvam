import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Public } from './auth/auth.decorator';

@Controller('api')
export class AppController {
  @Public()
  @HttpCode(200)
  @Get('health')
  getHealth(): any {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };

    try {
      return healthcheck;
    } catch (error) {
      healthcheck.message = error.message || 'Service Unavailable';
      throw new HttpException(healthcheck, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}

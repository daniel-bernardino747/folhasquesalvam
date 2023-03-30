import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('api')
export class AppController {
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

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /api/health', () => {
    it('should return a "OK" message when the health endpoint is called', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/api/health',
      );

      expect(status).toBe(200);
      expect(body.message).toBe('OK');

      // 1 second timeout for request response
      const timeout = setTimeout(() => {
        expect(body.uptime).toBeCloseTo(process.uptime(), 1);
      }, 1000);
      await new Promise((resolve) => setTimeout(resolve, 500));
      clearTimeout(timeout);
    });
  });
});

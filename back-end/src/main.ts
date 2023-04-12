import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Folhas Que Salvam')
    .setDescription(
      `🌿 Folhas Que Salvam is an environmental project aimed at raising awareness about the importance of preserving nature and promoting sustainable practices. 
      This full-stack project 🚀 utilizes a combination of cutting-edge technologies such as Next.js, Clerk, and Nest.js to deliver a seamless user experience. 🌍`,
    )
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();

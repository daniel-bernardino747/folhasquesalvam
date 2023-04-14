import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Folhas Que Salvam')
  .setDescription(
    `🌿 Folhas Que Salvam is an environmental project aimed at raising awareness about the importance of preserving nature and promoting sustainable practices. 
      This full-stack project 🚀 utilizes a combination of cutting-edge technologies such as Next.js, Clerk, and Nest.js to deliver a seamless user experience. 🌍`,
  )
  .addBearerAuth({
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    bearerFormat: 'Bearer {{sessionId}}',
  })
  .setVersion('0.1')
  .build();

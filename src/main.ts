import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auto Service API')
    .setDescription('API автосервиса: клиенты, автомобили, заказы и запчасти.')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running at ${await app.getUrl()}`, 'Bootstrap');
}
await bootstrap();

import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {DocumentBuilder} from '@nestjs/swagger';
import {SwaggerModule} from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('Employee management')
    .setDescription('This is an employee management API')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();

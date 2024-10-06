import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', // Localhost
      'http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com', // EC2 public DNS
      'http://18.237.230.139', // EC2 public IP
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', // Add this if you're running the frontend locally
      'https://webmasterbee.com', // Your production domain
      'http://apiv2.verydesi.com',
      "http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com" // Backend domain (if necessary)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();

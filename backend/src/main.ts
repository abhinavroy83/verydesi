import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com',
      'https://ec2-18-237-230-139.us-west-2.compute.amazonaws.com',
      'http://apiv2.verydesi.com',
      'https://apiv2.verydesi.com',
      'https://verydesi-client.vercel.app',
      'https://verydesi.com',
      'https://adminv2.verydesi.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(8000, '0.0.0.0');
}
bootstrap();

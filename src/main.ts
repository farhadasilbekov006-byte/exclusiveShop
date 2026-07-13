import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://shop2-j5ix92fk9-farhadasilbekov006-bytes-projects.vercel.app',
  ],
  credentials: true,
});


  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  
      transform: true,   
    }),
  );

  const port = process.env.PORT ?? 3006;

  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();

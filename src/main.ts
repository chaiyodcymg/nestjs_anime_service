import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AnimeInitialData } from './migrations/anime_initial_data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(parseInt(process.env.PORT));
}
export const animeData = new AnimeInitialData();
bootstrap();

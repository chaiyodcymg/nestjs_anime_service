import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StudioModule } from './studio/studio.module';
import { ChapterModule } from './chapter/chapter.module';
import { AnimeModule } from './anime/anime.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, StudioModule, ChapterModule, AnimeModule],
})
export class AppModule {}

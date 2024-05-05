import { Controller, Get, Post, Delete, Put, Param, HttpCode, HttpStatus, Body,} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Anime } from './anime.interface';
import { AnimeDto, ParamAnimeIdDto } from './anime.dto';

@Controller('anime')
export class AnimeController {
    constructor(private readonly animeService: AnimeService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllAnime(): Anime[]{
        return this.animeService.getAllAnime();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getSingleAnimeById(@Param() params: ParamAnimeIdDto): Anime{
        return this.animeService.getSingleAnimeById(params);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewAnime(@Body() createAnimeDto: AnimeDto): string{
        return this.animeService.createNewAnime(createAnimeDto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    updateAnime(@Param() params: ParamAnimeIdDto, @Body() updateAnimeDto: AnimeDto){
        return this.animeService.updateAnime(params, updateAnimeDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAnime(@Param() params: ParamAnimeIdDto): string {
        return this.animeService.deleteAnime(params);
    }
}

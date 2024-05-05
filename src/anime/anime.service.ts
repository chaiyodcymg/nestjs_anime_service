import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { Anime } from './anime.interface';
import { animeData } from 'src/main';
import { AnimeDto, ParamAnimeIdDto } from './anime.dto';
import { v4 as uuidv4 } from 'uuid';
import { Chapter } from 'src/chapter/chapter.interface';

@Injectable()
export class AnimeService {
  
    getAllAnime(){
        if(animeData.anime.length === 0) return [];
        return animeData.anime;
    }

    getSingleAnimeById(params: ParamAnimeIdDto): Anime{
        const { id } = params;
        const result: Anime | undefined = animeData.anime.find(anime => anime.id == id);
        if(result === undefined) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return result;
    }

    createNewAnime(createAnimeDto: AnimeDto): string{
        const { name, studioId, year } = createAnimeDto;
        const indexBystudioId: number = animeData.studio.findIndex(studio => studio.id === studioId);
        if(indexBystudioId === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const animeDto: Anime = {
            id: uuidv4(),
            name: name,
            studioId: studioId,
            year: year
        };
        animeData.anime.push(animeDto);
        return "Created"
    }

    updateAnime(params: ParamAnimeIdDto, updateAnimeDto: AnimeDto){
        const { id } = params;
        const { name, studioId, year } = updateAnimeDto;
        const index: number = animeData.anime.findIndex(anime => anime.id === id);
        if(index === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const indexBystudioId: number = animeData.studio.findIndex(studio => studio.id === studioId);
        if(indexBystudioId === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const animeUpdateData: Anime = {
            id: id,
            name: name,
            studioId: studioId,
            year:year,
        };
        animeData.anime[index] = animeUpdateData;
        return "Updated";
    }

    deleteAnime(params: ParamAnimeIdDto): string{
        const { id } = params;
        const index: number = animeData.anime.findIndex(anime => anime.id === id)
        if(index === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        animeData.anime = animeData.anime.filter(anime => anime.id !== id) as Anime[];
        const animeIdArr: string[] = animeData.chapter
                                                .filter(chapter => chapter.animeId === id)
                                                .map(chapter => chapter.id);
        if(animeIdArr.length > 0){
            animeData.chapter.forEach((chapter, index)=> {
                if(animeIdArr.includes(chapter.id)){
                    animeData.chapter[index].animeId = null;
                }
            })
        
        }
        return "Deleted";
    }
}
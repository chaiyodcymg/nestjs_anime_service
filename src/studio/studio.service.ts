import { Studio } from './studio.interface';
import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ParamStudioIdDto ,StudioDto } from './studio.dto';
import { animeData } from '../main';
import { Chapter } from 'src/chapter/chapter.interface';
import { Anime } from 'src/anime/anime.interface';

@Injectable()
export class StudioService {

    getAllStudios(): Studio[]{
        if(animeData.studio.length === 0) return [];
        return animeData.studio;
    }

    getSingleStudioById(params: ParamStudioIdDto): Studio {
        const { id } = params;
        const result: Studio | undefined = animeData.studio.find(studio => studio.id == id);
        if(result === undefined) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return result;
    }

    createNewStudio(createStudioDto: StudioDto): string{
        const { name, website } = createStudioDto;
        const studioDto: Studio = {
            id: uuidv4(),
            name: name,
            website: website
        };
        animeData.studio.push(studioDto);
        return "Created"
    }

    updateStudio(params: ParamStudioIdDto, updateStudioDto: StudioDto): string{
        const { id } = params;
        const { name , website} = updateStudioDto;
        const index = animeData.studio.findIndex(studio => studio.id === id);
        if(index === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        animeData.studio[index] = {id: id, name: name , website: website};
        return "Updated";
    }

    deleteStudio(params: ParamStudioIdDto): string{
        const { id } = params;
        if(animeData.studio.findIndex(studio => studio.id === id) == -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        animeData.studio = animeData.studio.filter(studio => studio.id !== id) as Studio[];
        const studioIdByChapterArr: string[] = animeData.chapter
                                                .filter(chapter => chapter.studioId === id)
                                                .map(chapter => chapter.id);
        const studioIdByAnimeArr: string[] = animeData.anime
                                                .filter(anime => anime.studioId === id)
                                                .map(anime => anime.id);
        if(studioIdByChapterArr.length > 0){
            animeData.chapter.forEach((chapter, index)=> {
                if(studioIdByChapterArr.includes(chapter.id)){
                    animeData.chapter[index].studioId = null;
                }
            })
        }
        if(studioIdByAnimeArr.length > 0){
            animeData.anime.forEach((anime, index)=> {
                if(studioIdByAnimeArr.includes(anime.id)){
                    animeData.anime[index].studioId = null;
                }
            })
        }
        return "Deleted";
    }
}

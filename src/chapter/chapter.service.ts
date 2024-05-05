import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { Chapter } from './chapter.interface';
import { ParamChapterIdDto, ChapterDto } from './chapter.dto';
import { v4 as uuidv4 } from 'uuid';
import { animeData } from '../main';

@Injectable()
export class ChapterService {

    getAllChapters(): Chapter[]{
        if(animeData.chapter.length === 0) return [];
        return animeData.chapter;
    }

    getSingleChapterById(params: ParamChapterIdDto): Chapter{
        const { id } = params;
        const result: Chapter | undefined = animeData.chapter.find(chapter => chapter.id == id);
        if(result === undefined) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return result;
    }

    createNewChapter(createChapterDto: ChapterDto): string{
        const { name, studioId, animeId, duration } = createChapterDto;
        const indexBystudioId: number = animeData.studio.findIndex(studio => studio.id === studioId);
        const indexByanimeId: number = animeData.anime.findIndex(anime => anime.id === animeId);
        if(indexBystudioId === -1 || indexByanimeId === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const chapterDto: Chapter = {
            id: uuidv4(),
            name: name,
            studioId: studioId,
            animeId: animeId,
            duration: duration
        };
        animeData.chapter.push(chapterDto);
        return "Created";
    }

    updateChapter(params: ParamChapterIdDto, updateChapterDto: ChapterDto){
        const { id } = params;
        const { name, studioId, animeId, duration } = updateChapterDto;
        const index: number = animeData.chapter.findIndex(chapter => chapter.id === id);
        if(index === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const indexBystudioId: number = animeData.studio.findIndex(studio => studio.id === studioId);
        const indexByanimeId: number = animeData.anime.findIndex(anime => anime.id === animeId);
        if(indexBystudioId === -1 || indexByanimeId === -1 ) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const chapterUpdateData: Chapter = {
            id: id,
            name: name,
            studioId: studioId,
            animeId: animeId,
            duration: duration
        };
        animeData.chapter[index] = chapterUpdateData;
        return "Updated";
    }

    deleteChapter(params: ParamChapterIdDto): string{
        const { id } = params;
        const index: number = animeData.chapter.findIndex(chapter => chapter.id === id);
        if(index === -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        animeData.chapter = animeData.chapter.filter(chapter => chapter.id !== id) as Chapter[];
        return "Deleted";
    }
}

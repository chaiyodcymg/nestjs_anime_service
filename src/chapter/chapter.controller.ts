import { Controller, Get, Post, Delete, Put, Param, HttpCode, HttpStatus, Body,} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from './chapter.interface';
import { ChapterDto, ParamChapterIdDto } from './chapter.dto';

@Controller('chapter')
export class ChapterController {

    constructor(private readonly chapterService: ChapterService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllChapters(): Chapter[]{
        return this.chapterService.getAllChapters();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getSingleChapterById(@Param() params: ParamChapterIdDto): Chapter{
        return this.chapterService.getSingleChapterById(params);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewChapter(@Body() createChapterDto: ChapterDto): string{
        return this.chapterService.createNewChapter(createChapterDto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    updateChapter(@Param() params: ParamChapterIdDto, @Body() updateChapterDto: ChapterDto){
        return this.chapterService.updateChapter(params, updateChapterDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteChapter(@Param() params: ParamChapterIdDto): string {
        return this.chapterService.deleteChapter(params);
    }
}

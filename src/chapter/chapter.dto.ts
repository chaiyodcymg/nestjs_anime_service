import { IsNotEmpty, IsString , IsUUID, IsNumber } from 'class-validator';


export class ChapterDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUUID()
    studioId: string;

    @IsNotEmpty()
    @IsUUID()
    animeId: string ;

    @IsNotEmpty()
    @IsNumber()
    duration: number;
}


export class ParamChapterIdDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;
}
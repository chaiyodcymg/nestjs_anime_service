import { IsNotEmpty, IsString , IsUUID, IsNumber } from 'class-validator';
export class AnimeDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsUUID()
    studioId: string;
}
export class ParamAnimeIdDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;
}
import { IsNotEmpty, IsString , IsUUID, IsUrl } from 'class-validator';

export class StudioDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    website: string;
}


export class ParamStudioIdDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;
}
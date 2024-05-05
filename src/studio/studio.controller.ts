import { Controller, Get, Post, Delete, Put, Param, HttpCode, HttpStatus, Body,} from '@nestjs/common';
import { Studio } from './studio.interface';
import { StudioService } from './studio.service';
import { StudioDto, ParamStudioIdDto } from './studio.dto';

@Controller('studio')
export class StudioController {

    constructor(private readonly studioService: StudioService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllStudios(): Studio[] {
        return this.studioService.getAllStudios();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getSingleStudioById(@Param() params: ParamStudioIdDto): Studio {
        return this.studioService.getSingleStudioById(params);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewStudio(@Body() createStudioDto: StudioDto): string{
        return this.studioService.createNewStudio(createStudioDto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    updateStudio(@Param() params: ParamStudioIdDto, @Body() updateStudioDto:StudioDto): string{
        return this.studioService.updateStudio(params, updateStudioDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteStudio(@Param() params: ParamStudioIdDto): string {
        return this.studioService.deleteStudio(params);
    }
}

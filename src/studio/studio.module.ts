import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';

@Module({
    providers: [StudioService],
    controllers: [StudioController]
})
export class StudioModule {}

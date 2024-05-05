import { Anime } from "../anime/anime.interface";
import { Chapter } from "../chapter/chapter.interface";
import { Studio } from "../studio/studio.interface";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export class AnimeInitialData{
    public chapter: Chapter[] = [];
    public studio: Studio[] = [];
    public anime: Anime[] = [];

    constructor(){
        this.generateData();
    }

    private generateData(){
        this.studio = Array.from({ length: 5 }, (_, i) => (
            { 
                id: uuidv4(), 
                name: faker.internet.domainWord(), 
                website: faker.internet.url()
            }
        )) as Studio[];
        this.anime = this.studio.map(studio => (
           { 
                id: uuidv4(),
                name: faker.internet.displayName(),
                year: faker.date.anytime().getFullYear(),
                studioId: studio.id
            }
        )) as Anime[]
        this.chapter = this.anime.map(anime => (
            {
                id: uuidv4(),
                name: faker.internet.displayName(),
                studioId: anime.studioId,
                animeId: anime.id,
                duration: faker.number.int({ min: 60 , max:200})
            }
        )) as Chapter[]
        console.log("AnimeInitialData: generate data successfully");  
    }
}
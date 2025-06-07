import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepositoryMongo } from 'src/repository/films.Mongo.repository';
import { AppConfig } from 'src/app.config.provider';
import { FilmsRepositoryPostgres } from 'src/repository/films.Postgresql.repository';

@Injectable()
export class FilmsService {

  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsDBMongo: FilmsRepositoryMongo,
    private readonly filmsDBPostgre: FilmsRepositoryPostgres,
  ) {}

  async findAll() {
    if(this.config.database.driver === 'mongodb') {
      return this.filmsDBMongo.findFilms();
    } else if(this.config.database.driver === 'postgres') {
      return this.filmsDBPostgre.findFilms()
    }
  }

  async findById(id: string) {
    if(this.config.database.driver === 'mongodb') {
      return this.filmsDBMongo.findFilmById(id);
    } else if (this.config.database.driver === 'postgres') {
      return this.filmsDBPostgre.findFilmById(id);
    }
  }
}

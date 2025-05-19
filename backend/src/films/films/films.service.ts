import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmDto } from '../dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmDB: FilmsRepository) {}

  async findAll() {
    return this.filmDB.findFilms()
  }

  async findById(id: string): Promise<FilmDto> {
    return this.filmDB.findFilmById(id);
  }
}

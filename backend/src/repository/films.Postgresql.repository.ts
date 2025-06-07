import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmNotFindException } from 'src/exceptions/filmNotFind';
import { sessionNotFind } from 'src/exceptions/sessionNotFind';
import { FilmDto } from 'src/films/dto/films.dto';
import { Film } from 'src/films/entities/film.entity';
import { Schedule } from 'src/films/entities/schedule.entity';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { findIndex } from 'rxjs';
import { serverError } from 'src/exceptions/serverError';

export class FilmsRepositoryPostgres {
  constructor (
    @Inject('FILM_DB')
    private filmRepository: Repository<Film>
  ) {}
  async findFilms(): Promise<{total: number, items: FilmDto[]}> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({ relations: {schedule: true} }),
    ])
    return {total, items};
  }
  async findFilmById(filmId: string): Promise<Film> {
    try {
      return this.filmRepository.findOne({
        where: {id: filmId},
        relations: {schedule: true}
      })
    } catch (err) {
      throw new FilmNotFindException(filmId)
    }
  }
  async sessionData(filmId: string, sessionId: string) {
    try {
      const session = await this.filmRepository.findOne({
        where: {id: filmId},
        relations: {schedule: true}
      })
      const sessionIndex = session.schedule.findIndex((session) => {
        return session.id === sessionId
      })
      return session.schedule[sessionIndex].taken
    } catch (err) {
      throw new sessionNotFind(sessionId)
    }
  }
  async placeOrder(filmId: string, sessionId: string, places: string) {
    const session = await this.filmRepository.findOne({
      where: {id: filmId},
      relations: {schedule: true}
    })
    const sessionIndex = session.schedule.findIndex((session) => {
      return session.id === sessionId
    })
    const oldData = session.schedule[sessionIndex].taken
    const newData = oldData.concat(places)
    session.schedule[sessionIndex].taken = newData

    try {
      await this.filmRepository.save(session)
      return
    } catch (err) {
      new serverError('Error from server')
    }
  }
}

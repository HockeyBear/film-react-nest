import { Inject, Session } from '@nestjs/common';
import { FilmDto } from '../films/dto/films.dto';
import { sessionNotFind } from 'src/exceptions/sessionNotFind';
import { Model } from 'mongoose';
import { Film } from 'src/films/schemas/films.schemas';
import { FilmNotFindException } from 'src/exceptions/filmNotFind';

export class FilmsRepository {
  constructor(@Inject('FILM_DB') private filmModel: Model<Film>) {}

  private GetFilmsFn(): (FilmFromDatabase: Film) => FilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        title: root.title,
        about: root.about,
        description: root.description,
        image: root.image,
        cover: root.cover,
        schedule: root.schedule,
      }
    }
  }

  async findFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmModel.find({})
    const total = await this.filmModel.countDocuments({})
    return {
      total, items: films.map(this.GetFilmsFn())
    }
  }

  async findFilmById(filmId: string): Promise<FilmDto> {
    try {
      const film = await this.filmModel.findOne({ id: filmId });
      return film;
    } catch (error) {
      throw new FilmNotFindException(filmId);
    }
  }

  async sessionData(filmId: string, sessionId: string): Promise<string[]> {
    try {
      const film = await this.filmModel.findOne({ id: filmId });
      const sessionIndex = film.schedule.findIndex((session) => {
        return session.id === sessionId;
      })
      return film.schedule[sessionIndex].taken;
    } catch (err) {
      throw new sessionNotFind(sessionId);
    }
  }

  async placeOrder(filmId: string, sessionId: string, place: string): Promise<string[]> {
    const film = await this.filmModel.findOne({ id: filmId });
    const sessionIndex = film.schedule.findIndex((session) => {
      return session.id === sessionId
    })
    try {
      await this.filmModel.updateOne({ id: filmId }, { $push: {[ `schedule.${sessionIndex.toString()}.taken` ]: place} },)
      return;
    } catch (err) {
      new Error('Unknown error place order');
    }
  }
}

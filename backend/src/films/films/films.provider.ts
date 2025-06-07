import { Film } from "../entities/film.entity";
import { FilmSchema } from "../schemas/films.schemas";
import { connection } from "mongoose";
import { AppConfig } from "src/app.config.provider";

export const FilmsProvider = {
  provide: 'FILM_DB',
  inject: ['DB_CONNECT', 'CONFIG'],
  useFactory: (connection, config: AppConfig) => {
    if(config.database.driver === 'postgres') {
      return connection.getRepository(Film)
    } else if (config.database.driver === 'mongodb') {
      return connection.model('Film', FilmSchema)
    }
  }
};
import { FilmSchema } from "../schemas/films.schemas";

export const FilmsProvider = {
  provide: 'FILM_DB',
  inject: ['DB_CONNECT', 'CONFIG'],
  useFactory: (connection) =>  {
    const model = connection.model('Film', FilmSchema)
    console.log('Коллекция:', model.collection.name);
    return model
  }
};
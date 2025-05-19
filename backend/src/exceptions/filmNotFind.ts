import { HttpException, HttpStatus } from "@nestjs/common";

export class FilmNotFindException extends HttpException {
  constructor(id: string) {
    super (`Такого фильма с id ${id} не найден`, HttpStatus.BAD_REQUEST);
  }
}
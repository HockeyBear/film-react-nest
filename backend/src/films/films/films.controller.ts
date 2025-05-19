import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsDB: FilmsService) {}
  
  @Get()
  getFilms() {
    return this.filmsDB.findAll();
  }

  @Get(':id/schedule')
async getFilmSchedule(@Param('id') id: string) {
  const film = await this.filmsDB.findById(id);
  if (!film) {
    throw new NotFoundException(`Фильм с id ${id} не найден`);
  }
  return { items: film.schedule || [] };
}
}

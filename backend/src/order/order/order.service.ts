import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { FilmsRepositoryMongo } from '../../repository/films.Mongo.repository';
import { createOrderDto } from '../dto/order.dto';
import { placeIsOccupied } from 'src/exceptions/placeIsOccupied';
import { AppConfig } from 'src/app.config.provider';
import { FilmsRepositoryPostgres } from 'src/repository/films.Postgresql.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG')
    private readonly config: AppConfig,
    private readonly filmDbMongo: FilmsRepositoryMongo,
    private readonly filmDbPostgre: FilmsRepositoryPostgres,
  ) {}

  async orderPlace(orderData: createOrderDto) {
  const ticketsForPurchase = [];

  if (this.config.database.driver === 'mongodb') {
    for (const ticket of orderData.tickets) {
      const sessionData = await this.filmDbMongo.sessionData(ticket.film, ticket.session);
      const seatsSelect = `${ticket.row}:${ticket.seat}`;
      if (sessionData.includes(seatsSelect)) {
        throw new placeIsOccupied(seatsSelect);
      }
      ticketsForPurchase.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    for (const ticket of ticketsForPurchase) {
      await this.filmDbMongo.placeOrder(ticket.film, ticket.session, `${ticket.row}:${ticket.seat}`);
    }

  } else if (this.config.database.driver === 'postgres') {
    for (const ticket of orderData.tickets) {
      const sessionData = await this.filmDbPostgre.sessionData(ticket.film, ticket.session);
      const seatsSelect = `${ticket.row}:${ticket.seat}`;
      if (sessionData.includes(seatsSelect)) {
        throw new placeIsOccupied(seatsSelect);
      }
      ticketsForPurchase.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    for (const ticket of ticketsForPurchase) {
      await this.filmDbPostgre.placeOrder(ticket.film, ticket.session, `${ticket.row}:${ticket.seat}`);
    }
  }

  return {
    total: ticketsForPurchase.length,
    items: ticketsForPurchase,
  };
}

}

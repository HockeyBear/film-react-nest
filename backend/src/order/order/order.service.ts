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

  async orderPlace(orderData: createOrderDto): Promise<any> {
    const ticketsForPurchase = [];

    if (this.config.database.driver === 'mongodb') {
      for (const order of orderData.orderData) {
        const sessionData = await this.filmDbMongo.sessionData(
          order.filmId,
          order.sessionId,
        );
        if (sessionData.includes(order.seatsSelect)) {
          throw new placeIsOccupied(order.seatsSelect);
        }
        ticketsForPurchase.push({
          filmId: order.filmId,
          sessionId: order.sessionId,
          seatsSelect: order.seatsSelect,
        });
        if (ticketsForPurchase.length > 0) {
          for (const ticket of ticketsForPurchase) {
            const { filmId, sessionId, seatsSelect } = ticket;
            await this.filmDbMongo.placeOrder(filmId, sessionId, seatsSelect);
          }
        }
      }
    } else if (this.config.database.driver === 'postgres') {
      for (const order of orderData.orderData) {
        const sessionData = await this.filmDbPostgre.sessionData(
          order.filmId,
          order.sessionId,
        );
        if (sessionData.includes(order.seatsSelect)) {
          throw new placeIsOccupied(order.seatsSelect);
        }
        ticketsForPurchase.push({
          filmId: order.filmId,
          sessionId: order.sessionId,
          seatsSelect: order.seatsSelect,
        });
        if (ticketsForPurchase.length > 0) {
          for (const ticket of ticketsForPurchase) {
            const { filmId, sessionId, seatsSelect } = ticket;
            await this.filmDbPostgre.placeOrder(filmId, sessionId, seatsSelect);
          }
        }
      }
    }

    return {
      items: ticketsForPurchase,
    };
  }
}

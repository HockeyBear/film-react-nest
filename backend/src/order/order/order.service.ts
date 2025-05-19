import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../../repository/films.repository';
import { createOrderDto } from '../dto/order.dto';
import { placeIsOccupied } from 'src/exceptions/placeIsOccupied';

@Injectable()
export class OrderService {
  constructor (private readonly filmDB: FilmsRepository) {}
  async orderPlace(orderData: createOrderDto): Promise<any> {
    const ticketsForPurchase = [];

    console.log('orderData instanceof createOrderDto:', orderData instanceof createOrderDto);
    console.log('orderData.orderData:', orderData.orderData);


    for (const order of orderData.orderData) {
      const sessionData = await this.filmDB.sessionData(
        order.filmId,
        order.sessionId,
      );
      if (sessionData.includes(order.seatsSelect)) {
        throw new placeIsOccupied(order.seatsSelect)
      }

      ticketsForPurchase.push({
        filmId: order.filmId,
        sessionId: order.sessionId,
        seatsSelect: order.seatsSelect,
      });
    }
    if (ticketsForPurchase.length > 0) {
      ticketsForPurchase.forEach((ticket) => {
        const { filmId, sessionId, seatsSelect } = ticket;
        this.filmDB.placeOrder(filmId, sessionId, seatsSelect)
      })
    }
    return {
      items: ticketsForPurchase,
    };
  }
}

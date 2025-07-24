import { IsNumber, IsString } from "class-validator";

class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

class ContactsDto {
  @IsString()
  email: string;
  @IsString()
  phone: string;
}

// class PlaceTicketDto {
//   @IsString()
//   filmId: string;
//   @IsString()
//   sessionId: string;
//   @IsString()
//   seatsSelect: string;
// }

export class createOrderDto extends ContactsDto {
  tickets: TicketDto[];
  // public get orderData() {
  //   const request: PlaceTicketDto[] = [];
  //   this.tickets.forEach((ticket) => {
  //     const order = {} as PlaceTicketDto;
  //     order.filmId = ticket.film;
  //     order.seatsSelect = `${ticket.row}:${ticket.seat}`;
  //     order.sessionId = ticket.session;
  //     request.push(order);
  //   });
  //   return request;
  // }
}
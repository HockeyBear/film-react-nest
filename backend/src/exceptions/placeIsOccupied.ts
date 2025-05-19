import { HttpException, HttpStatus } from "@nestjs/common";

export class placeIsOccupied extends HttpException {
  constructor(place: string) {
    const row = place.split(':')[0];
    const seat = place.split(':')[1];
    super(`Место(а): ряд ${row} и место ${seat} уже заняты`, HttpStatus.BAD_REQUEST);
  }
}
import { IsDate, IsFQDN, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleDto[]
}

export class ScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class addFilmDto {
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: string[];
}

export class addScheduleDto {
  @IsDate()
  daytime: string;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsString()
  taken: string [];
}
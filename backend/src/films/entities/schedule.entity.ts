import { IsArray, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsString()
  filmId: string;

  @Column()
  @IsNumber()
  hall: number
  
  @Column()
  @IsNumber()
  rows: number
  
  @Column()
  @IsNumber()
  seats: number
  
  @Column()
  @IsNumber()
  price: number

  @Column('text', { array: true, default: [] })
  @IsArray()
  taken: string[];


  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film
}
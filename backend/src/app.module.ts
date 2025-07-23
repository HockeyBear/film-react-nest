import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";
import { FilmsController } from './films/films/films.controller';
import { OrderController } from './order/order/order.controller';
import { FilmsProvider } from './films/films/films.provider';
import { FilmsRepositoryMongo } from './repository/films.Mongo.repository';
import { FilmsService } from './films/films/films.service';
import { OrderService } from './order/order/order.service';
import { DBModule } from './db/db.module';
import { FilmsRepositoryPostgres } from './repository/films.Postgresql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';
import { DevLogger } from './devLogger/dev.logger';

@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      ServeStaticModule.forRoot({
        rootPath: path.join(__dirname, '..', 'public'),
        serveRoot: '/content/afisha'
      }),
      DBModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsProvider, FilmsRepositoryMongo, FilmsRepositoryPostgres, FilmsService, OrderService, DevLogger],
})
export class AppModule {}

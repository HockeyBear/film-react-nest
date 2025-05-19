import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";
import { FilmsController } from './films/films/films.controller';
import { OrderController } from './order/order/order.controller';
import { FilmsProvider } from './films/films/films.provider';
import { FilmsRepository } from './repository/films.repository';
import { FilmsService } from './films/films/films.service';
import { OrderService } from './order/order/order.service';
import { DBModule } from './db/db.module';

@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      ServeStaticModule.forRoot({
        rootPath: path.join(__dirname, '..', 'public'),
        renderPath: '/content/afisha'
      }),
      DBModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsProvider, FilmsRepository, FilmsService, OrderService],
})
export class AppModule {}

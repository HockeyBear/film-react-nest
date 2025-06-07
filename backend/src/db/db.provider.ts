import mongoose from "mongoose";
import { AppConfig } from "src/app.config.provider";
import { Film } from "src/films/entities/film.entity";
import { Schedule } from "src/films/entities/schedule.entity";
import { DataSource } from "typeorm";

export const DBProvider = {
  provide: 'DB_CONNECT',

  useFactory: async (
    config: AppConfig,
  ): Promise<typeof mongoose | DataSource> => {
    if (config.database.driver === 'mongodb') {
      return await mongoose.connect(config.database.url)
    } else if (config.database.driver === 'postgres') {
      const dataSource = new DataSource({
        type: config.database.driver,
        host: config.database.host,
        port: Number(config.database.port),
        username: config.database.username,
        password: config.database.password,
        database: config.database.databasename,
        entities: [Film, Schedule],
        synchronize: false,
        logging: true
      })
      return await dataSource.initialize()
    }
  }, inject: ['CONFIG'],
}

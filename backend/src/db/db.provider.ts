import mongoose from "mongoose";
import { AppConfig } from "src/app.config.provider";

export const DBProvider = {
  provide: 'DB_CONNECT',
  useFactory: async (config: AppConfig) => {
    return await mongoose.connect(config.database.url);
  },
  inject: ['CONFIG'],
};
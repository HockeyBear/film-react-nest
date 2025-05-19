import { Module } from "@nestjs/common";
import { configProvider } from "src/app.config.provider";
import { DBProvider } from "./db.provider";

@Module({
  providers: [configProvider, DBProvider],
  exports: [DBProvider],
})

export class DBModule {};
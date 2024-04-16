import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleEntitiesModule } from "./sample-entity/sample-entity.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3406,
      username: "root",
      password: "root",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    SampleEntitiesModule,
  ],
})
export class AppModule {}

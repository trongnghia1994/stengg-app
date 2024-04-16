import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleEntity } from "./sample-entity.entity";
import { SampleEntitiesController } from "./sample-entity.controller";
import { SampleEntitiesService } from "./sample-entity.service";

@Module({
  imports: [TypeOrmModule.forFeature([SampleEntity])],
  exports: [SampleEntitiesService],
  providers: [SampleEntitiesService],
  controllers: [SampleEntitiesController],
})
export class SampleEntitiesModule {}

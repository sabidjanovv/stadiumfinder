import { Module } from "@nestjs/common";
import { StadiumTimesService } from "./stadium_times.service";
import { StadiumTimesController } from "./stadium_times.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { StadiumTime } from "./models/stadium_time.model";

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime])],
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService],
})
export class StadiumTimesModule {}

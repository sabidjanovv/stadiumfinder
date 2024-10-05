import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Comfort } from "../../comfort/models/comfort.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IComfortStadiumCreationAttr {
  stadium_id: number;
  comfort_id: number;
}


@Table({ tableName: "comfort_stadium" })
export class ComfortStadium extends Model<
  ComfortStadium,
  IComfortStadiumCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the comfort-stadium (autoincrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the stadium",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
  })
  stadium_id: number;
  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @ApiProperty({
    example: 1,
    description: "ID of the comfort",
  })
  @ForeignKey(() => Comfort)
  @Column({
    type: DataType.INTEGER,
  })
  comfort_id: number;
  @BelongsTo(() => Comfort)
  comfort: Comfort;
}

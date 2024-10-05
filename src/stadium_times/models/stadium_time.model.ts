import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";
import { Cart } from "../../cart/models/cart.model";
import { Order } from "../../orders/models/order.model";

interface IStadiumTimeCreationAttr {
  stadium_id: number;
  start_time: string;
  end_time: string;
  price: string;
}

@Table({ tableName: "stadium_time" })
export class StadiumTime extends Model<Stadium,IStadiumTimeCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the stadium_time (autoincrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the stadium, for which the time slot is created",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
  })
  stadium_id: number;
  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @ApiProperty({ example: "10:00", description: "Start time of the time slot" })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({ example: "12:00", description: "End time of the time slot" })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;

  @ApiProperty({ example: "1500", description: "Price of the time slot" })
  @Column({
    type: DataType.STRING,
  })
  price: string;

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(()=>Order)
  orders: Order[];
}

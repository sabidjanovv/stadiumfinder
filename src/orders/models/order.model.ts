import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { StadiumTime } from "../../stadium_times/models/stadium_time.model";

interface IOrderCreationAttr {
  user_id: number;
  user_wallet_id: number;
  st_times_id: number;
  date: Date;
  createdAt: Date;
  status: string;
}

@Table({ tableName: "order" })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the order (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the user, who owns the order",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;
  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 1,
    description: "ID of the user's wallet, where the order is stored",
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
  })
  user_wallet_id: number;
  @BelongsTo(() => UserWallet)
  userWallet: UserWallet;

  @ApiProperty({
    example: 1,
    description: "ID of the stadium time, when the order is stored",
  })
  @ForeignKey(() => StadiumTime)
  @Column({
    type: DataType.INTEGER,
  })
  st_times_id: number;
  @BelongsTo(() => StadiumTime)
  stadiumTimes: StadiumTime;

  @ApiProperty({
    example: new Date(),
    description: "Date and time, when the order was created",
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  date: Date;

  @ApiProperty({
    example: "active",
    description: "Current status of the order",
  })
  @Column({
    type: DataType.ENUM,
    values: ["active", "canceled", "finished"],
    defaultValue: "active",
  })
  status: string;
}

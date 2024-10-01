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

interface IUserWallet {
  userId: number;
  wallet: number;
}

@Table({ tableName: "user_wallet" })
export class UserWallet extends Model<UserWallet, IUserWallet> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the user wallet (autoincrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the user, who owns the wallet",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 123,
    description: "Wallet raqami",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  wallet: number;
}

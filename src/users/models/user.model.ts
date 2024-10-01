import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserCard } from "../../user_cards/models/user_card.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  phone: string;
  tg_link: string;
  hashed_password: string;
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the user (auto increment)",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: "Sardor Sobidjonov",
    description: "Full name of the user",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: "sobidjonov@gmail.com",
    description: "Email of the user",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: "+998911111111",
    description: "Phone number of the user",
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: "@sardorsobidjonov",
    description: "Telegram link of the user",
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: "$2b$10$h0m84378169320583267.91r2l/2m4K6/l7u7Q2a4092815",
    description: "Hashed password of the user",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;


  @ApiProperty({
    example: "photo.jpg",
    description: "Photo URL of the user",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(()=>UserCard)
  userCards: UserCard[];

  @HasMany(()=>UserWallet)
  userWallets: UserWallet[];
}

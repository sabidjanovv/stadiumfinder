import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserCardAttr {
  userId: number;
  name: string;
  phone: string;
  number: string;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}

@Table({ tableName: "user_card" })
export class UserCard extends Model<UserCard, IUserCardAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the user card (auto increment)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "User ID",
  })
  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
  @BelongsTo(()=>User)
  user: User;

  @ApiProperty({
    example: "Sardor SObidjonov",
    description: "Karta egasi Ism Familiyasi",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: "+998900000000",
    description: "Karta egasi Telefon raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: "1234567890123456",
    description: "Karta  Raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  number: string;

  @ApiProperty({
    example: 27,
    description: "Karta Yili",
  })
  @Column({
    type: DataType.INTEGER,
  })
  year: number;

  @ApiProperty({
    example: 12,
    description: "Karta Oy",
  })
  @Column({
    type: DataType.INTEGER,
  })
  month: number;

  @ApiProperty({
    example: true,
    description: "Karta  Statusi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: true,
    description: "Bosh Karta",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main: boolean;
}

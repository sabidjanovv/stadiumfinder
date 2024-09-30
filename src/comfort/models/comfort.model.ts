import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType } from "sequelize-typescript";

interface IComfortAttr {
  name: string;
}

@Table({ tableName: "comfort" })
export class Comfort extends Model<Comfort, IComfortAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the comfort (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "comfortable",
    description: "Name of comfort",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}

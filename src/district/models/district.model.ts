import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IDistrict {
  name: string;
  regionId: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, IDistrict> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the district (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Shayxontohur",
    description: "Name of District",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}

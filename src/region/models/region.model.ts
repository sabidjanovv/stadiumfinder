import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegion {
  name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, IRegion> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the region (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Name of the region",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(()=>District)
  districts: District[];
}

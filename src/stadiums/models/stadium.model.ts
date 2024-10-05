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
import { Category } from "../../categories/models/category.model";
import { User } from "../../users/models/user.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { ComfortStadium } from "../../comfort_stadium/models/comfort_stadium.model";
import { Comment } from "../../comments/models/comment.model";
import { Media } from "../../media/models/media.model";

interface IStadiumsCreationAttr {
  category_id: number;
  owner_id: number;
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  region_id: number;
  district_id: number;
  location: string;
  buildAt: Date;
  start_time: string;
  end_time: string;
}

@Table({ tableName: "stadiums" })
export class Stadium extends Model<Stadium, IStadiumsCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the stadiums (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the category, in which the stadium belongs",
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({
    example: 1,
    description: "ID of the user, who owns the stadium",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;
  @BelongsTo(() => User)
  owner: User;

  @ApiProperty({
    example: "Sardor Sobidjonov",
    description: "Name of the person, who contacted the stadium owner",
  })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({
    example: "Sardor Sobidjonov Stadium",
    description: "Name of the stadium",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: "1000000",
    description: "Volume of stadium, in square meters",
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: "Ibn Sino Street, 12",
    description: "Address of the stadium",
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: 1,
    description: "ID of the region, in which the stadium is located",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({
    example: 1,
    description: "ID of the district, in which the stadium is located",
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({
    example: "Toshkent, Uzbekistan",
    description: "Location of the stadium",
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Date of building the stadium",
  })
  @Column({
    type: DataType.DATE,
  })
  buildAt: Date;

  @ApiProperty({
    example: "10:00",
    description: "Start time of the stadium",
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: "22:00",
    description: "End time of the stadium",
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;

  @HasMany(() => ComfortStadium)
  comfortStadium: ComfortStadium[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(()=> Media)
  media: Media[];
}
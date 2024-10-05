import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IMediaCreationAttr {
  stadium_id: number;
  photo: string;
  description: string;
}

@Table({tableName: "media"})
export class Media extends Model<Media, IMediaCreationAttr>{
    @ApiProperty({
        example: 1,
        description: "Unique ID of the media (autoincrement)",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 1,
        description: "Stadium ID",
    })
    @ForeignKey(() => Stadium)
    @Column({
        type: DataType.INTEGER,
    })
    stadium_id: number;
    @BelongsTo(() => Stadium)
    stadium: Stadium;

    @ApiProperty({
        example: "photo.jpg",
        description: "Description of the photo",
    })
    @Column({
        type: DataType.STRING,
    })
    photo: string;

    @ApiProperty({
        example: "This is a nice photo of the stadium",
        description: "Description of the media",
    })
    @Column({
        type: DataType.STRING,
    })
    description: string;
}

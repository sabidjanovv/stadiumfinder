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
import { User } from "../../users/models/user.model";

interface ICommentCreationAttr {
  user_id: number;
  stadium_id: number;
  impression: string;
}

@Table({ tableName: "comment" })
export class Comment extends Model<Comment, ICommentCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the comment (autoincrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: "ID of the user, who wrote the comment",
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
    description: "ID of the stadium, where the comment was made",
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
  })
  stadium_id: number;
  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @ApiProperty({
    example: "Great place! The staff was friendly and helpful.",
    description: "Content of the comment",
  })
  @Column({
    type: DataType.STRING,
  })
  impression: string;
}

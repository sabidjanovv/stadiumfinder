import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Stadium } from "../../stadiums/models/stadium.model";

interface ICategory {
  name: string;
}

@Table({ tableName: "category" })
export class Category extends Model<Category, ICategory> {
  @ApiProperty({
    example: 1,
    description: "Unique ID of the category (auto increment)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Football",
    description: "Name of the category",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 2,
    description: "Parent Category ID",
    required: false,
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  parent_category_id: number;

  @BelongsTo(() => Category)
  parentCategory: Category;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}

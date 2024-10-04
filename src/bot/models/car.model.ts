import { Table, Model, Column, DataType } from "sequelize-typescript"

interface ICarCreationAttr {
  user_id: number;
  car_number:string;
  model:string;
  color:string;
  year:string;
  last_enter:string;
}


@Table({ tableName: "car" })
export class Car extends Model<Car, ICarCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  car_number: string;

  @Column({
    type: DataType.STRING,
  })
  model: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @Column({
    type: DataType.STRING,
  })
  year: string;

  @Column({
    type: DataType.STRING,
  })
  last_enter: string;
}

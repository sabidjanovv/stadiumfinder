import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminAttr {
  login: string;
  tg_link: string;
  photo: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tg_link: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
  is_creator: boolean;
}

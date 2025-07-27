import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

@Table({ timestamps: true, tableName: 'notes' })
export default class Note extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => User, 'userId')
  user!: User;
}
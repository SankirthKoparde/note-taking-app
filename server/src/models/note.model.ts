// server/src/models/note.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'notes' })
export default class Note extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;
}
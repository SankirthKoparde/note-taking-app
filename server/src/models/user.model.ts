import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Note from './note.model';

@Table({ timestamps: true, tableName: 'users' })
export default class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  dateOfBirth!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  googleId?: string;

  @HasMany(() => Note, 'userId')
  notes!: Note[];
}
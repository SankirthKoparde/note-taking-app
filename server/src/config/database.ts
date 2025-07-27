import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import User from '../models/user.model';
import Note from '../models/note.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Note],
  logging: false, // Set to true to see SQL queries
});

// Define relationships
User.hasMany(Note, { foreignKey: 'userId', onDelete: 'CASCADE' });
Note.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;
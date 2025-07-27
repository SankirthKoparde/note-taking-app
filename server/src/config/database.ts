import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import User from '../models/user.model';
import Note from '../models/note.model';

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Required for Render connections
    }
  },
  models: [User, Note],
  logging: false,
});

User.hasMany(Note, { foreignKey: 'userId', onDelete: 'CASCADE' });
Note.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;
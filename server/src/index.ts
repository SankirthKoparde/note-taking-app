import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/user.routes';
import noteRoutes from './routes/note.routes';

const app = express();
const PORT = process.env.PORT || 5001;

// --- TEMPORARY CORS FIX: Allow all origins ---
app.use(cors());
// ---------------------------------------------

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
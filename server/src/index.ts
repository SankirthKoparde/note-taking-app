import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/user.routes'; // Import user routes
import noteRoutes from './routes/note.routes'; 
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/users', userRoutes); // Changed from '/users' to '/api/users'
app.use('/api/notes', noteRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the SQL API!');
});

// Add this catch-all 404 handler after all other routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

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
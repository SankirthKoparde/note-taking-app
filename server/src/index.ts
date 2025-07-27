import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/user.routes';
import noteRoutes from './routes/note.routes';

const app = express();
const PORT = process.env.PORT || 5001;

// --- CORS Configuration ---
const corsOptions = {
  origin: 'https://note-taking-appsanki.vercel.app', // Your Vercel frontend URL
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
// --- End CORS Configuration ---

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

const startServer = async () => {
  // ... rest of the file is the same
};

startServer();
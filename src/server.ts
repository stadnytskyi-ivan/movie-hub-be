import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import movieRoutes from './routers/movieRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

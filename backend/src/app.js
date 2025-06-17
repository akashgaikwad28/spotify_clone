import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import 
import userRouter from "./routes/user.routes.js";

// routes declaretion

app.use("/api/v1/users",userRouter)


import connectDB from './db/db.js';

// Connect to MongoDB
connectDB();

import albumRoutes from './routes/albumRoutes.js';
import songRoutes from './routes/songRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Spotify Backend API is running');
});

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

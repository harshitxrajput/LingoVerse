import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import { connectDB } from './lib/db.js'

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
})
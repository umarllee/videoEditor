import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import CategoryRoute from './router/category.router.js';
import VideoRouter from './router/video.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MongoDB_url = process.env.MONGODB_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/category', CategoryRoute);
app.use('/api/video', VideoRouter);

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    mongoose.connect(MongoDB_url)
        .then(() => {
            console.log(`Database connected and server listening on ${PORT}`);
        })
        .catch((error) => {
            console.log('Database connection error:', error);
        });
});

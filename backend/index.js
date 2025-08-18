import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import tweetRoutes from './routes/tweetRoute.js';
import cors from 'cors';

dotenv.config({
path: '.env',
});
connectDB();
const app = express();

const PORT = process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: ["https://twitter-clone-pratik.vercel.app", "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
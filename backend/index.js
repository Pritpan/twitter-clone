import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
dotenv.config({
path: '.env',
});
connectDB();
const app = express();

const PORT = process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './routes/User';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_IP as string)
    .then(() => console.log('[Server]: MongoDB is connected'))
    .catch((err) => console.log(err));


app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});

app.use((req: Request, res: Response, next) => {
    console.log(`[Server]: ${req.method} ${req.path}`);
    console.log(req.body);
    next();
});

app.use('/api/auth', UserRoutes);
// app.use('/api/books', BooksRoutes);
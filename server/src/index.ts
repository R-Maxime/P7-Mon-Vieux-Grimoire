import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './routes/User';
import BooksRoutes from './routes/Book';

dotenv.config();

class App {
    private expressApp: Express;

    constructor() {
        this.expressApp = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.connectToDatabase();
        this.startServer();
    }

    private setupMiddleware(): void {
        this.expressApp.use(express.json());
        this.expressApp.use(cors());

        this.expressApp.use((req: Request, res: Response, next) => {
            console.log(`[Server]: ${req.method} ${req.path}`);
            next();
        });

        this.expressApp.use('/public', express.static('public'));
    }

    private setupRoutes(): void {
        this.expressApp.use('/api/auth', UserRoutes);
        this.expressApp.use('/api/books', BooksRoutes);
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_IP as string);
            console.log('[Server]: MongoDB is connected');
        } catch (err) {
            console.log(err);
        }
    }

    private startServer(): void {
        const port = process.env.PORT || 4000;
        this.expressApp.listen(port, () => {
            console.log(`[Server]: I am running at http://localhost:${port}`);
        });
    }
}

new App();

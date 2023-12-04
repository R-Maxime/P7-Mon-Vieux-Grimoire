import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './routes/User';
import BooksRoutes from './routes/Book';

// https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf
class App {
  private expressApp: Express;

  private readonly MONGO_IP: string;

  private readonly API_PORT = process.env.API_PORT || 4000 as Number;

  constructor() {
    dotenv.config();
    this.MONGO_IP = process.env.MONGO_IP as string;
    this.connectToDatabase();
    this.expressApp = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.startServer();
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.MONGO_IP as string);
      console.info('[Server]: MongoDB is connected');
    } catch (err) {
      console.error(err);
    }
  }

  private setupMiddleware(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());

    this.expressApp.use((req: Request, res: Response, next) => {
      console.info(`[Server]: ${req.method} ${req.path}`);
      next();
    });

    this.expressApp.use('/public', express.static('public'));
  }

  private setupRoutes(): void {
    this.expressApp.use('/api/auth', UserRoutes);
    this.expressApp.use('/api/books', BooksRoutes);
  }

  private startServer(): void {
    this.expressApp.listen(this.API_PORT, () => {
      console.info(`[Server]: I am running at http://localhost:${this.API_PORT}`);
    });
  }
}

new App();

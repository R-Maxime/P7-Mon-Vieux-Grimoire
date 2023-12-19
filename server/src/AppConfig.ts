import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import UserRoutes from './routes/User';
import BooksRoutes from './routes/Book';

export default class AppConfig {
  private expressApp: Express;

  constructor(expressApp: Express) {
    this.expressApp = expressApp;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupRateLimit(): void {
    if (process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'test') {
      return;
    }

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });

    this.expressApp.use(limiter);
  }

  private setupMiddleware(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    this.setupRateLimit();

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
}

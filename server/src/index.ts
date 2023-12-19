import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AppConfig from './AppConfig';

// https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf
class App {
  private expressApp: Express;

  private readonly MONGO_IP: string;

  private readonly API_PORT: Number;

  constructor() {
    dotenv.config();

    this.MONGO_IP = process.env.MONGO_IP as string;
    this.API_PORT = Number(process.env.API_PORT) || 4000;

    this.expressApp = express();
    new AppConfig(this.expressApp);

    this.connectToDatabase();
    this.startServer();
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.MONGO_IP as string);
      console.info('[Server]: MongoDB is connected');
    } catch (err) {
      console.error('[Server]: MongoDB connection failed', err);
      process.exit(1);
    }
  }

  private startServer(): void {
    this.expressApp.listen(this.API_PORT, () => {
      console.info(`[Server]: I am running at http://localhost:${this.API_PORT}`);
    });
  }
}

new App();

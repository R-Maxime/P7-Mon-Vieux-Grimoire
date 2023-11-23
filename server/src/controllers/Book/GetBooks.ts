import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';

class GetBooks {
  static async get(req: Request, res: Response) {
    try {
      const books = await MongoIBookModel.find();

      res.status(200).json(books);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
}

export default GetBooks.get;
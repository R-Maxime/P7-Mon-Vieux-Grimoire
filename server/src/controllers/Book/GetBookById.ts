import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';

class GetBookById {
  static async get(req: Request, res: Response) {
    try {
      const book = await MongoIBookModel.findOne({ _id: req.params.id });

      res.status(200).json(book);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
}

export default GetBookById.get;
import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';

export default function GetBooks(req: Request, res: Response) {
  MongoIBookModel.find()
    .then(books => res.status(200).json(books))
    .catch(error => {
      console.error(error);
      res.status(400).json({ message: error.message })
    });
}

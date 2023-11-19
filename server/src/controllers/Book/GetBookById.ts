import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';

export default function GetBookById(req: Request, res: Response) {
  MongoIBookModel.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => {
      console.error(error);
      res.status(404).json({ message: error.message })
    });
}
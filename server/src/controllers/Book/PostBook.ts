import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';
import fs from 'fs';

export default function PostBook(req: Request, res: Response) {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;

  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  const book = new MongoIBookModel({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`
  })


  book.save()
    .then(() => res.status(201).json({ message: 'Book created' }))
    .catch(error => {
      if (req.file) {
        fs.unlinkSync(`public/img/${req.file.filename}`);
      }

      console.error(error);
      res.status(400).json({ message: error.message })
    });
}
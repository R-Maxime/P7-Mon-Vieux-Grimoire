import { MongoIBookModel } from '../models/Book';
import e, { Request, Response } from 'express';
import fs from 'fs';

export function getBooks(req: Request, res: Response) {
  MongoIBookModel.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ message: error.message }));
}

export function getBookById(req: Request, res: Response) {
  MongoIBookModel.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ message: error.message }));
}

export function postBook(req: Request, res: Response) {
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
      res.status(400).json({ message: error.message })
    });
}
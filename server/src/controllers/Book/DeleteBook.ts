import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';
import fs from 'fs';

export default function DeleteBook(req: Request, res: Response) {
  const bookId = req.params.id;

  MongoIBookModel.findOne({ _id: bookId })
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const filename = book.imageUrl.split('/img/')[1];

      fs.unlink(`public/img/${filename}`, () => {
        book.deleteOne({ _id: bookId })
          .then(() => {
            res.status(200).json({ message: 'Book deleted' })
          })
          .catch(error => {
            console.error(error);
            res.status(400).json({ message: error.message })
          });
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: error.message })
    });
}
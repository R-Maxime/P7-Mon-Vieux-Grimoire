import { MongoIBookModel } from '../../models/Book';
import { Request, Response } from 'express';
import fs from 'fs';

class PostBook {
  static async post(req: Request, res: Response) {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;

    if (!req.file) {
      console.log('No file provided');
      return res.status(400).json({ message: 'No file provided' });
    }

    const book = new MongoIBookModel({
      ...bookObject,
      imageUrl: `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`
    });

    book.save()
      .then(e => {
        console.log('Book created', e);
        res.status(201).json({ message: 'Book created' })
      })
      .catch(error => {
        if (req.file) {
          fs.unlinkSync(`public/img/${req.file.filename}`);
        }
        console.error(error);
        res.status(400).json({ message: error.message })
      });
  }
}

export default PostBook.post;
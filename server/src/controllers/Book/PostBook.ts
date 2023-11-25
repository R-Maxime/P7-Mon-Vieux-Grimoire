import { Book } from '../../models/Book';
import { Request, Response } from 'express';

export default class PostBook {
  bookRepository: Book;

  constructor(bookRepository: Book) {
    this.bookRepository = bookRepository;
  }

  public async post(req: Request, res: Response) {
    try {
      const bookObject = JSON.parse(req.body.book);
      delete bookObject._id;

      if (!req.file) {
        console.log('No file provided');
        console.error('No file provided');
        return res.status(400).json({ message: 'No file provided' });
      }

      const book = await this.bookRepository.createBook({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`
      });

      if (!book) {
        console.error('Error while creating book');
        return res.status(500).json({ message: 'Error while creating book' });
      }

      res.status(201).json({ message: 'Book created' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

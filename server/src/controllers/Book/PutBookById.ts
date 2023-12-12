import { Request, Response } from 'express';
import { IBook } from '../../models/Book';
import GetBookByIdQuery from './Usecase/GetBookByIdQuery';
import PutBookCommand from './Usecase/PutBookCommand';
import IPutBookById from '../Interfaces/Book/IPutBookById';

export default class PutBookById implements IPutBookById {
  getByIdQuery: GetBookByIdQuery;

  putBookCommand: PutBookCommand;

  constructor(getByIdQuery: GetBookByIdQuery, putBookCommand: PutBookCommand) {
    this.getByIdQuery = getByIdQuery;
    this.putBookCommand = putBookCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const bookObject: IBook = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`,
      } : {
        ...req.body,
      };

      bookObject._id = req.params.id;

      const book = await this.getByIdQuery.execute(bookObject._id);

      if (!book.data) {
        return res.status(book.status).json({ message: book.message });
      }

      if (book.data.userId !== bookObject.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const put = await this.putBookCommand.execute(bookObject, !!req.file);

      return res.status(put.status).json({ message: put.message });
    } catch (error) {
      console.error('Error while updating book', error);
      return res.status(500).json({ message: 'Error while updating book', error });
    }
  }
}

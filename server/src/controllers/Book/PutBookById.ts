import { Request, Response } from 'express';
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
      const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`,
      } : {
        ...req.body,
      };

      bookObject._id = req.params.id;

      const book = await this.getByIdQuery.execute(bookObject._id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const put = await this.putBookCommand.execute(bookObject, !!req.file);

      return res.status(200).json(put);
    } catch (error) {
      console.error('Error while updating book', error);
      return res.status(500).json({ message: 'Error while updating book', error });
    }
  }
}

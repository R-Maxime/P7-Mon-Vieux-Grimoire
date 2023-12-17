import { Request, Response } from 'express';
import DeleteBookCommand from './Usecase/DeleteBookCommand';
import IDeleteBookById from '../Interfaces/Book/IDeleteBookById';

export default class DeleteBookById implements IDeleteBookById {
  deleteBookCommand: DeleteBookCommand;

  constructor(deleteBookCommand: DeleteBookCommand) {
    this.deleteBookCommand = deleteBookCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.deleteBookCommand.execute(req);

      return res.status(200).json({ message: deleted });
    } catch (error) {
      console.error('Error while deleting book', error);
      return res.status(500).json({ message: 'Error while deleting book', error });
    }
  }
}

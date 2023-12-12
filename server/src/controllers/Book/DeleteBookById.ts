import { Request, Response } from 'express';
import DeleteBookCommand from './Usecase/DeleteBookCommand';

export default class DeleteBookById {
  deleteBookCommand: DeleteBookCommand;

  constructor(deleteBookCommand: DeleteBookCommand) {
    this.deleteBookCommand = deleteBookCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.deleteBookCommand.execute(req);

      return res.status(deleted.status).json({ message: deleted.message });
    } catch (error) {
      console.error('Error while deleting book', error);
      return res.status(500).json({ message: 'Error while deleting book', error });
    }
  }
}

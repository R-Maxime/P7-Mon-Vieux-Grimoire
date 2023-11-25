import { Book } from '../../models/Book';
import { Request, Response } from 'express';
import fs from 'fs/promises';

export default class DeleteBook {
  bookRepository: Book;

  constructor(bookRepository: Book) {
    this.bookRepository = bookRepository;
  }

  public async delete(req: Request, res: Response) {
    try {
      const bookId = req.params.id;

      const book = await this.bookRepository.getBookById(bookId);

      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }

      const filename = book.imageUrl.split('/img/')[1];

      await fs.unlink(`public/img/${filename}`);

      const deleted = await this.bookRepository.deleteBook(bookId);

      if (!deleted) {
        return res.status(500).json({ message: 'Erreur lors de la suppression' });
      }

      res.status(200).json({ message: 'Livre supprimé' });
    } catch (error: any) {
      console.error(error);

      if (error.code === 'ENOENT') {
        return res.status(404).json({ message: 'Fichier non trouvé' });
      }

      res.status(500).json({ message: error.message });
    }
  }
};

import { IBook } from '../../../../models/Book';
import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents the query interface for getting a book by its ID.
 */
export default interface IGetBookByIdQuery {
  bookRepository: IBookRepository;

  execute(id: string): Promise<IBook | Error>;
}

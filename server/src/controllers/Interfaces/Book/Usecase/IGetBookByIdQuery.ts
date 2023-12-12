import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';
import IBookUseCaseResponse from './IBookUseCaseResponse';

/**
 * Represents the query interface for getting a book by its ID.
 */
export default interface IGetBookByIdQuery {
  bookRepository: IBookRepository;

  /**
   * Executes the query to get a book by its ID.
   * @param id - The ID of the book.
   * @returns A promise that resolves to the book use case response.
   */
  execute(id: string): Promise<IBookUseCaseResponse>;
}

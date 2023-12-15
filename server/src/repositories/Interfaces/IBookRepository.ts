import { IBook, MongoIBookModel } from '../../models/Book';

export interface MongoIBookRepository extends IBook {
  _id: string;
  IBook: IBook;
}

/**
 * Represents a repository for managing books.
 */
export default interface IBookRepository {
  readonly bookRepository: typeof MongoIBookModel;

  /**
   * Retrieves all books.
   * @returns A promise that resolves to an array of books.
   */
  getBooks(): Promise<IBook[]>;

  /**
   * Retrieves a book by its ID.
   * @param id - The ID of the book.
   * @returns A promise that resolves to the book with the specified ID, or null if not found.
   */
  getBookById(id: string): Promise<IBook | null>;

  /**
   * Saves a book with updated data.
   * @param bookId - The ID of the book to update.
   * @param newBookData - The updated book data.
   * @returns A promise that resolves to the updated book, or null if not found.
   */
  saveBook(bookId: string, newBookData: IBook): Promise<IBook | null>;

  /**
   * Deletes a book by its ID.
   * @param bookId - The ID of the book to delete.
   * @returns A promise that resolves to the deleted book, or null if not found.
   */
  deleteBook(bookId: string): Promise<IBook | null>;

  /**
   * Creates a new book.
   * @param bookData - The data of the book to create.
   * @returns A promise that resolves to the created book.
   */
  createBook(bookData: IBook): Promise<IBook>;

  /**
   * Retrieves three books with the best rating.
   * @returns A promise that resolves to an array of books with the best rating.
   */
  getBookBestRating(): Promise<IBook[]>;

  /**
   * Updates a book with new data.
   * @param bookObject - The book object with updated data.
   * @returns A promise that resolves to the updated book, or null if not found.
   */
  updateBook(bookObject: MongoIBookRepository | IBook): Promise<IBook | null>;
}

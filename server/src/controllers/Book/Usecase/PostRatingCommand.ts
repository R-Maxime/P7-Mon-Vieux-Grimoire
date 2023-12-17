import IBookRepository from '../../../repositories/Interfaces/IBookRepository';
import IPostRatingCommand, { PostRatingCommandParams } from '../../Interfaces/Book/Usecase/IPostRatingCommand';

export default class PostRatingCommand implements IPostRatingCommand {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute({ userId, bookId, rating }: PostRatingCommandParams): Promise<void> {
    const book = await this.bookRepository.getBookById(bookId);

    if (!book) {
      return Promise.reject(new Error('Book not found'));
    }

    if (book.ratings.some((r) => r.userId === userId)) {
      return Promise.reject(new Error('User already rated this book'));
    }

    if (rating < 0 || rating > 5) {
      return Promise.reject(new Error('Invalid rating'));
    }

    book.ratings.push({
      userId,
      grade: rating,
    });

    book.averageRating = book.ratings
      .reduce((acc, curr) => acc + Number(curr.grade), 0) / book.ratings.length;

    const updated = await this.bookRepository.updateBook(book);

    if (!updated) {
      return Promise.reject(new Error('Book not updated'));
    }

    return Promise.resolve();
  }
}

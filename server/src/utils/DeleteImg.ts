import fs from 'fs';
import { IBook } from '../models/Book';

export default function DeleteImg(book: IBook) {
  if (book.imageUrl) {
    const filename = book.imageUrl.split('/img/')[1];
    if (fs.existsSync(`public/img/${filename}`)) {
      fs.unlinkSync(`public/img/${filename}`);
    }
  }
}

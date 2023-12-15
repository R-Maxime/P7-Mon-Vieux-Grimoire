import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IBook {
  userId: String,
  title: String,
  author: String,
  year: Number,
  genre: String,
  imageUrl: String,
  ratings: [{
    userId: String
    grade: Number
  }],
  averageRating: Number
}

const bookSchema = new Schema<IBook>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: [{
    userId: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  }],
  averageRating: {
    type: Number,
    required: true,
  },
});

bookSchema.plugin(uniqueValidator);
export const MongoIBookModel = mongoose.model<IBook>('Book', bookSchema);

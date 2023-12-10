import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IBook extends mongoose.Document {
  userId: String, // identifiant MongoDB unique de l'utilisateur qui a créé le livre
  title: String, // titre du livre
  author: String, // auteur du livre
  year: Number, // année de publication du livre
  genre: String, // genre du livre
  imageUrl: String, // illustration/couverture du livre
  ratings: [{
    userId: String // identifiant MongoDB unique de l'utilisateur qui a noté le livre
    grade: Number // note donnée à un livre
  }], // notes données à un livre
  averageRating: Number // note moyenne du livre
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

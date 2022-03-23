import { mongoose } from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  author: String,
  categories: [String],
  currency: String,
  description: String,
  isbn12: String,
  language: String,
  price: Number,
  publicationDate: Date,
  publisher: String,
  ratingsCount: Number,
  reviews: [
    {
      author: String,
      description: String,
      starRating: Number,
    },
  ],
  title: {
    type: String,
    required: true,
  },
});

export const models = [
  {
    name: "Book",
    schema: bookSchema,
    collection: "books",
  },
];

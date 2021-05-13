import { Collection, ObjectId } from 'mongodb';

export interface Book {
  _id: ObjectId;
  title: string;
  image: string;
  price: number;
  pages: number;
  year: number;
  author: string;
  rating: number;
}

export interface Database {
  books: Collection<Book>;
}

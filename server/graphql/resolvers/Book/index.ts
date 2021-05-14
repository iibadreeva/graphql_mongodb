import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';

import { Database, Book } from '@server/lib/types';

export const bookResolvers: IResolvers = {
  Query: {
    books: async (
      _root: undefined,
      _args: [],
      { db }: { db: Database }
    ): Promise<Book[]> => {
      // throw new Error('Error');
      return await db.books.find({}).toArray();
    }
  },
  Mutation: {
    deleteBook: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Book> => {
      const deleteRes = await db.books.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete book');
      }

      return deleteRes.value;
    }
  },
  Book: {
    id: (Book: Book): string => Book._id.toString()
  }
};

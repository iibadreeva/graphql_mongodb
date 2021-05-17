import dotenv from 'dotenv';

import { connectDatabase } from '../database';

dotenv.config();

const clear = async () => {
  try {
    console.log('[clear] : running...');

    const db = await connectDatabase();

    const books = await db.books.find({}).toArray();
    const bookings = await db.bookings.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (books.length > 0) {
      await db.books.drop();
    }
    if (bookings.length > 0) {
      await db.bookings.drop();
    }

    if (listings.length > 0) {
      await db.listings.drop();
    }

    if (users.length > 0) {
      await db.users.drop();
    }

    console.log('[clear] : success');
  } catch {
    throw new Error('failed to clear database');
  }
};

clear();

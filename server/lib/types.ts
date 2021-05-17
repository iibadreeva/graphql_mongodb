import { Collection, ObjectId } from 'mongodb';

export enum ListingType {
  Apartment = 'apartment',
  House = 'house'
}

export type Viewer = {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest?: boolean;
};

export type Book = {
  _id: ObjectId;
  title: string;
  image: string;
  price: number;
  pages: number;
  year: number;
  author: string;
  rating: number;
};

export type BookingsIndexMonth = {
  [key: string]: boolean;
};

export type BookingsIndexYear = {
  [key: string]: BookingsIndexMonth;
};

export type Booking = {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
};

export type Listing = {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndexYear;
  price: number;
  numOfGuests: number;
};

export type User = {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
};

export interface Database {
  books: Collection<Book>;
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}

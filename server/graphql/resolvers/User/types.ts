import { Booking, Listing } from '../../../lib/types';

export type UserArgs = {
  id: string;
};

export type UserBookingsArgs = {
  limit: number;
  page: number;
};

export type UserBookingData = {
  total: number;
  result: Booking[];
};

export type UserListingsArgs = {
  limit: number;
  page: number;
};

export type UserListingData = {
  total: number;
  result: Listing[];
};

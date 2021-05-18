import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';

import { Database, User } from '../../../lib/types';
import { authorize } from '../../../utils';

import {
  UserArgs,
  UserBookingData,
  UserBookingsArgs,
  UserListingData,
  UserListingsArgs
} from './types';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("user can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer?._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (err) {
        throw new Error(`Failed to query user: ${err}`);
      }
    }
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: UserBookingsArgs,
      { db }: { db: Database }
    ): Promise<UserBookingData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }
        const data: UserBookingData = {
          total: 0,
          result: []
        };
        let cursor = await db.bookings.find({
          _id: { $in: user.bookings }
        });

        // page = 1; limit = 10: cursor stars at 0
        // page = 2; limit = 10: cursor stars at 10
        // page = 3; cursor stars at 20
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (err) {
        throw new Error(`faild to query user bookings: ${err}`);
      }
    },
    listings: async (
      user: User,
      { limit, page }: UserListingsArgs,
      { db }: { db: Database }
    ): Promise<UserListingData | null> => {
      try {
        const data: UserListingData = {
          total: 0,
          result: []
        };
        let cursor = await db.listings.find({
          _id: { $in: user.listings }
        });

        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (err) {
        throw new Error(`faild to query user listings: ${err}`);
      }
    }
  }
};

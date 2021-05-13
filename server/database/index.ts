import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import { Database } from '@server/lib/types';

dotenv.config();
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER } = process.env;

// https://cloud.mongodb.com/
const uri = `mongodb://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net:27017,${DB_CLUSTER}.mongodb.net:27017,${DB_CLUSTER}.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-y2semo-shard-0&authSource=admin&retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db('main');

  return {
    books: db.collection('books')
  };
};

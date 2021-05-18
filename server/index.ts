import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

dotenv.config();
const { PORT, SECRET } = process.env;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  });
  app.use(cookieParser(SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });

  server.applyMiddleware({ app, path: '/api' });
  app.listen(PORT);

  console.log(`[app] : http://localhost:${PORT}`);
};

mount(express());

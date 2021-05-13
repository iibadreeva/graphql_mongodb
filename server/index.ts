import express, { Application } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

dotenv.config();
const { PORT } = process.env;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
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

  server.applyMiddleware({ app, path: '/api' });
  app.listen(PORT);

  console.log(`[app] : http://localhost:${PORT}`);
};

mount(express());

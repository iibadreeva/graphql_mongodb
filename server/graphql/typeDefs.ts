import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    image: String!
    price: String!
    pages: Int!
    year: Int!
    author: String!
    rating: Float!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    deleteBook(id: ID!): Book!
  }
`;

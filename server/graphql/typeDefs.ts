import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

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

  input LogInInput {
    code: String!
  }

  type Query {
    books: [Book!]!
    authUrl: String!
  }

  type Mutation {
    deleteBook(id: ID!): Book!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;

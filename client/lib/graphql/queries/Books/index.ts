import { gql } from 'apollo-boost';

export const BOOKS = gql`
  query Books {
    books {
      id
      title
      image
      price
      pages
      year
      author
      rating
    }
  }
`;

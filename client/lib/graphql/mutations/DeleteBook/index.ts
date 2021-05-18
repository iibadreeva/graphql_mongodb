import { gql } from 'apollo-boost';

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

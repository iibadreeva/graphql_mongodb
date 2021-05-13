/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Books
// ====================================================

export interface Books_books {
  __typename: "Book";
  id: string;
  title: string;
  image: string;
  price: string;
  pages: number;
  year: number;
  author: string;
  rating: number;
}

export interface Books {
  books: Books_books[];
}

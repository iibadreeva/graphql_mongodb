import React, { FC } from 'react';
import { gql } from 'apollo-boost';

import { useQuery, useMutation } from 'react-apollo';

import { BookList } from '@/pages/Books/BookList/BookList';

import { Books as BooksData } from './__generated__/Books';
import {
  deleteBook as DeleteBooksData,
  deleteBookVariables as DeleteBooksVariables
} from './__generated__/deleteBook';
import './Books.css';

const BOOKS = gql`
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

const DELETE_LISTING = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

type Props = {
  title: string;
};

export const Books: FC<Props> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<BooksData>(BOOKS);
  const [
    deleteListing,
    { loading: deleteBookLoading, error: deleteBookError }
  ] = useMutation<DeleteBooksData, DeleteBooksVariables>(DELETE_LISTING);

  const handleDeleteBook = async (id: string) => {
    await deleteListing({ variables: { id } });

    refetch();
  };

  const books = data ? data.books : null;

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Что-то пошло не так, попробйте позднее</h3>;
  }

  return (
    <div className="books">
      <h2 className="books__title">{title}</h2>
      {deleteBookLoading && <h3>Loading ...</h3>}
      {deleteBookError && <h3>Что-то пошло не так, попробйте позднее</h3>}
      <ul>
        {books &&
          books?.map((book) => (
            <BookList
              key={book.id}
              book={book}
              handleDeleteBook={handleDeleteBook}
            />
          ))}
      </ul>
    </div>
  );
};

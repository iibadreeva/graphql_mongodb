import React, { FC } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { BookList } from '@/pages/Books/BookList/BookList';

import { BOOKS } from '@/lib/graphql/queries/Books';
import { Books as BooksData } from '@/lib/graphql/queries/Books/__generated__/Books';
import { DELETE_BOOK } from '@/lib/graphql/mutations/DeleteBook';
import {
  deleteBook as DeleteBooksData,
  deleteBookVariables as DeleteBooksVariables
} from '@/lib/graphql/mutations/DeleteBook/__generated__/deleteBook';

import './Books.css';

type Props = {
  title: string;
};

export const Books: FC<Props> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<BooksData>(BOOKS);
  const [
    deleteListing,
    { loading: deleteBookLoading, error: deleteBookError }
  ] = useMutation<DeleteBooksData, DeleteBooksVariables>(DELETE_BOOK);

  const handleDeleteBook = async (id: string) => {
    console.log('del ' + id);
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

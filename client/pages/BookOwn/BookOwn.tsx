import React, { FC } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { useMutation } from '@/hooks/useMutaion';

import { BooksData, DeleteBooksData, DeleteBooksVariables } from './types';

const BOOKS_OWN = `
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

const DELETE_BOOK = `
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

type Props = {
  title: string;
};

export const BookOwn: FC<Props> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<BooksData>(BOOKS_OWN);
  const [
    deleteBook,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteBooksData, DeleteBooksVariables>(DELETE_BOOK);

  const handleDeleteBook = async (id: string) => {
    await deleteBook({ id });
    refetch();
  };

  const books = data ? data.books : null;

  const booksList =
    books &&
    books?.map((book) => (
      <li key={book.id}>
        {book.title}
        <button onClick={() => handleDeleteBook(book.id)}>
          Delete a listing
        </button>
      </li>
    ));

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Что-то пошло не так, попробуйте позднее</h3>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {deleteListingLoading && <h3>Loading ...</h3>}
      {deleteListingError && <h3>Что-то пошло не так, попробйте позднее</h3>}
      <ul>{booksList}</ul>
    </div>
  );
};

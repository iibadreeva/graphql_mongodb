import React, { FC } from 'react';

import { Books_books as BookType } from '@/pages/Books/__generated__/Books';

import './BookList.css';

type Props = {
  book: BookType;
  handleDeleteBook: (id: string) => void;
};

export const BookList: FC<Props> = ({ book, handleDeleteBook }) => {
  return (
    <li className="book-list" key={book.id}>
      <img className="book-list__image" src={book.image} alt={book.title} />
      <div className="book-list__content">
        <h1 className="book-list__title">{book.title}</h1>
        <p>Автор:{book.author}</p>
        <p>Год издания:{book.year}</p>
        <p>Количество страниц:{book.pages}</p>
        <p>
          Цена: <span className="book-list__price">{book.price} р.</span>
        </p>
      </div>
      <button
        className="book-list__button"
        onClick={() => handleDeleteBook(book.id)}
      >
        Удалить
      </button>
    </li>
  );
};

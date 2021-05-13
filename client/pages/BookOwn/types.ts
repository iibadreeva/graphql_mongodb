export type BooksType = {
  id: string;
  title: string;
  image: string;
  price: number;
  pages: number;
  year: number;
  author: string;
  rating: number;
};

export type BooksData = {
  books: BooksType[];
};

export type DeleteBooksData = {
  deleteBook: BooksType;
};

export type DeleteBooksVariables = {
  id: string;
};

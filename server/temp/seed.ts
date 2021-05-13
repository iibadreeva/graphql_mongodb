import dotenv from 'dotenv';
import { ObjectID } from 'mongodb';

import { connectDatabase } from '../database';
import { Book } from '../lib/types';

dotenv.config();

// Подключаемся к облаку и создаем новые эллементы
const seed = async () => {
  try {
    console.log('[seed]: running...');

    const db = await connectDatabase();

    const books: Book[] = [
      {
        _id: new ObjectID(),
        title: 'Клара и Солнце',
        image:
          'https://cdn.book24.ru/v2/ITD000000001143079/COVER/cover3d1__w337.webp',
        price: 749,
        pages: 352,
        year: 2021,
        author: 'Исигуро Кадзуо',
        rating: 4.64
      },
      {
        _id: new ObjectID(),
        title: 'Помнить все. Практическое руководство по развитию памяти',
        image:
          'https://ndc.book24.ru/resize/674x900/iblock/104/1049d0a6712c831a4363d58da97e048e/0793b8d3dfb259d6f9487b12c10a64dc.jpg',
        price: 789,
        pages: 192,
        year: 2021,
        author: 'Думчев Артур',
        rating: 4.52
      },
      {
        _id: new ObjectID(),
        title: 'Наступает ночь... Что происходит, пока ты спишь',
        image:
          'https://ndc.book24.ru/resize/674x900/iblock/0b0/0b0c06c0164a316b56b2bfc7a01ad476/852c27cd7e439d82057067233faaede7.jpg',
        price: 683,
        pages: 64,
        year: 2021,
        author: 'Утник-Стругала Моника',
        rating: 5
      },
      {
        _id: new ObjectID(),
        title: 'Сага о Рейневане',
        image:
          'https://cdn.book24.ru/v2/ASE000000000846439/COVER/cover3d1__w337.webp',
        price: 1238,
        pages: 1360,
        year: 2020,
        author: 'апковский Анджей ',
        rating: 4.75
      }
    ];

    for (const book of books) {
      await db.books.insertOne(book);
    }

    console.log('[seed]: success');
  } catch (error) {
    throw new Error('faild to seed database');
  }
};

seed();

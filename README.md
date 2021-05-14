[![GraphQL](https://img.shields.io/badge/GraphQL-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://graphql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://cloud.mongodb.com/)
[![Typescript](https://img.shields.io/badge/Typescript-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://reactjs.org/)
[![Postcss](https://img.shields.io/badge/Postcss-%23239120.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://postcss.org/)
\
![node-current](https://img.shields.io/badge/node-14.x-23239120)
![node-current](https://img.shields.io/badge/npm-6.14.11-23239120)
![LINT](https://github.com/iibadreeva/graphql_mongodb/workflows/LINT/badge.svg?branch=main)

## Описание
В данном проекте решено было испольховать `graphql` в свзяке `mongodb`, есть страница с книгами [демо]()


## Установка
- Скачать пакеты
    - `npm install`
- Запустить dev
    - `npm run start`
- Запустить prod
    - `npm run prod`
- Создать схему
    - `npm run codegen:schema`
- Применяем схему для папки client
    - `npm run codegen:generate`
- Линтинг кода
    - `npm run lint:ts`
- Линтинг стилей
    - `npm run lint:style`

## что сделано:
- На стороне серевера настроено подключение и получение данных `mongodb` cloud
- На стороне сервера настроена логика `graphql` получение и удаление книг
- На стороне клиента настроен `Apollo`
- настроен webpack
- Защита от DOS атак: `express-rate-limit`
- Код стайлинг: `prettier`, `eslint`, `stylelint`;
- главная страница с книгами

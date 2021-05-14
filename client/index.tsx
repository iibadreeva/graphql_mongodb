import React from 'react';
import ReactDom from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Books } from '@/pages/Books';

import './styles/main.css';

const client = new ApolloClient({
  uri: 'http://localhost:9000/api'
});

ReactDom.render(
  <ApolloProvider client={client}>
    <Books title="Книги" />
  </ApolloProvider>,
  document.getElementById('root')
);

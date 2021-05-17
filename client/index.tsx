import React from 'react';
import ReactDom from 'react-dom';
// import ApolloClient from 'apollo-boost';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient
} from '@apollo/react-hooks';
// import { ApolloProvider } from 'react-apollo';

import { App } from '@/components/App';

import './styles/main.css';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: 'http://localhost:9000/api'
// });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api'
});

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

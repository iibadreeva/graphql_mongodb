import React from 'react';
import ReactDom from 'react-dom';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient
} from '@apollo/react-hooks';

import { App } from '@/components/App';

import './styles/main.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api'
});
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: '/api',
//   request: async (operation) => {
//     const token = sessionStorage.getItem('token');
//     operation.setContext({
//       headers: {
//         'X-CSRF-TOKEN': token || ''
//       }
//     });
//   }
// });

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

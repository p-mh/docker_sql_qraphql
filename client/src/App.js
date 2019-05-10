import React from 'react';
import ApolloClient from 'apollo-boost';
import AddGame from './components/AddGame';
import Game from './components/Game';
import { BrowserRouter, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: '/graphql' });

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Route exact path="/" component={AddGame} />
          <Route path="/game/:gameId" component={Game} />
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

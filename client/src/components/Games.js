import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { queryGames } from '../services/queries';

const Games = ({ data: { games } }) => {
  return (
    <ul>
      {games &&
        games.map(({ id, is_finish, players }) => (
          <li key={id}>
            <p>
              <Link to={`/game/${id}`}>Game {id}</Link>
              {is_finish ? ' - finish' : ' - playing'}
            </p>
            <ul>
              {players.map(({ id, username }) => (
                <li key={id}>{username}</li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default graphql(queryGames)(Games);

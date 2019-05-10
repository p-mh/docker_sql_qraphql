import { gql } from 'apollo-boost';

export const queryUsers = gql`
  {
    users {
      id
      username
    }
  }
`;

export const queryGames = gql`
  {
    games {
      id
      is_finish
      players {
        id
        username
      }
    }
  }
`;

export const getGameById = gql`
  query getGameById($id: ID) {
    game(id: $id) {
      id
      is_finish
      players {
        id
        username
      }
    }
  }
`;

export const addGame = gql`
  mutation($players: [ID]!) {
    addGame(players: $players) {
      id
      is_finish
      players {
        id
        username
      }
    }
  }
`;

export const queryGameScores = gql`
  query getScore($game_id: ID) {
    gamescores(game_id: $game_id) {
      game_id
      user_id
      score
    }
  }
`;

export const changeScore = gql`
  mutation($game_id: ID, $user_id: ID, $score: Int) {
    changeScore(game_id: $game_id, user_id: $user_id, score: $score) {
      score
    }
  }
`;

export const endGame = gql`
  mutation($id: ID) {
    endGame(id: $id) {
      id
      is_finish
    }
  }
`;

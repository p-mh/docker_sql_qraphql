import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {
  getGameById,
  queryGameScores,
  changeScore,
  endGame,
} from '../services/queries';

import PlayersScore from './PlayersScore';

class Game extends Component {
  state = {
    scores: {},
  };

  componentDidUpdate(prevProps) {
    if (prevProps.gameScores !== this.props.gameScores) {
      const {
        gameScores: { gamescores },
      } = this.props;
      this.setState({
        scores:
          gamescores &&
          gamescores.reduce((scores, { user_id, score }) => {
            return { ...scores, [user_id]: score };
          }, {}),
      });
    }
  }

  changeUserScore = (userId, { target: { value: score } }) => {
    this.setState(prevState => ({
      scores: { ...prevState.scores, [userId]: score },
    }));
  };

  sendUserScore = userId => {
    const {
      changeScore,
      match: {
        params: { gameId },
      },
    } = this.props;
    const { scores } = this.state;
    changeScore({
      variables: {
        game_id: gameId,
        user_id: userId,
        score: Number(scores[userId]),
      },
      refetchQueries: [
        {
          query: queryGameScores,
          variables: {
            game_id: gameId,
          },
        },
      ],
    });
  };

  endGameParty = () => {
    const {
      match: {
        params: { gameId },
      },
      endGame,
    } = this.props;
    endGame({
      variables: { id: gameId },
      refetchQueries: [
        {
          query: getGameById,
          variables: {
            id: gameId,
          },
        },
        {
          query: queryGameScores,
          variables: {
            game_id: gameId,
          },
        },
      ],
    });
  };

  render() {
    const {
      getGameById: { game, loading },
    } = this.props;
    const { scores } = this.state;

    const gameInfos = !loading && (
      <div>
        <div>GameId : {game.id}</div>
        <div>State : {game.is_finish ? 'finish' : 'playing'}</div>
        <div>
          Players :
          <ul>
            {game.players.map(({ id, username }) => (
              <PlayersScore
                key={id}
                id={id}
                username={username}
                is_finish={game.is_finish}
                score={scores && scores[id]}
                changeUserScore={this.changeUserScore.bind(this, id)}
                sendUserScore={this.sendUserScore.bind(this, id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );

    const finishButton = (
      <div>
        {!loading && !game.is_finish && (
          <button onClick={this.endGameParty}>End game</button>
        )}
      </div>
    );

    return (
      <div>
        <Link to="/">Home page</Link>
        {gameInfos}
        {finishButton}
      </div>
    );
  }
}

export default compose(
  graphql(getGameById, {
    name: 'getGameById',
    options: props => ({
      variables: {
        id: props.match.params.gameId,
      },
    }),
  }),
  graphql(queryGameScores, {
    name: 'gameScores',
    options: props => ({
      variables: {
        game_id: props.match.params.gameId,
      },
    }),
  }),
  graphql(changeScore, {
    name: 'changeScore',
  }),
  graphql(endGame, {
    name: 'endGame',
  })
)(Game);

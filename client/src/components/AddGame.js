import React from 'react';
import { graphql, compose } from 'react-apollo';

import { queryUsers, addGame, queryGames } from '../services/queries';

import Games from './Games';

class AddGame extends React.Component {
  state = {
    usersSelected: [],
  };
  addGame = () => {
    this.props.addGame({
      variables: { players: this.state.usersSelected },
      refetchQueries: [{ query: queryGames }],
    });
    this.setState({ usersSelected: [] });
  };

  changeUserSelected = ({ target: { value: user } }) => {
    this.setState(prevState => {
      const { usersSelected } = prevState;
      if (usersSelected.includes(user)) {
        const userIndex = usersSelected.indexOf(user);
        return {
          usersSelected: [
            ...usersSelected.slice(0, userIndex),
            ...usersSelected.slice(userIndex + 1),
          ],
        };
      }
      return { usersSelected: [...usersSelected, user] };
    });
  };

  render() {
    const {
      queryUsers: { loading, users },
    } = this.props;
    const { usersSelected } = this.state;
    const usersSelector =
      !loading &&
      users.map(({ username, id }) => (
        <li key={id}>
          <input
            type="checkbox"
            value={id}
            onChange={this.changeUserSelected}
            checked={usersSelected.includes(id)}
          />
          {username}
        </li>
      ));

    return (
      <div>
        <div>
          <ul style={{ listStyle: 'none', padding: '0' }}>{usersSelector}</ul>
        </div>
        <button onClick={this.addGame}>Add game</button>
        <Games />
      </div>
    );
  }
}

export default compose(
  graphql(queryUsers, { name: 'queryUsers' }),
  graphql(addGame, { name: 'addGame' })
)(AddGame);

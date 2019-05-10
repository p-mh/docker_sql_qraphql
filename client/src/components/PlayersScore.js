import React from 'react';

const PlayersScore = ({
  id,
  username,
  is_finish,
  score,
  changeUserScore,
  sendUserScore,
}) => {
  return (
    <li key={id}>
      {username}
      <div>
        <input
          type="text"
          placeholder="Score"
          disabled={is_finish}
          value={score}
          onChange={changeUserScore}
        />
        <button onClick={sendUserScore}>Save score</button>
      </div>
    </li>
  );
};

export default PlayersScore;

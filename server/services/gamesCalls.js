const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'gamedb',
  password: 'userpwd',
  port: 5432,
});

const getAllGames = async () => {
  const { rows } = await pool.query('SELECT * FROM games');
  return rows;
};

const getGameById = async gameId => {
  const { rows } = await pool.query(`SELECT * FROM games WHERE id = ${gameId}`);
  return rows[0];
};

const getGameUsers = async gameId => {
  const { rows } = await pool.query(
    `SELECT * FROM users u, users_game ug WHERE u.id = ug.user_id AND ug.game_id = ${gameId}`
  );
  return rows;
};

const addGame = async players => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: addGameRows } = await pool.query(
      'INSERT INTO games (is_finish) VALUES (false) RETURNING *'
    );
    const { id: gameId } = addGameRows[0];
    const playersAddValues = players
      .map(playerId => `(${playerId}, ${gameId})`)
      .join(', ');

    const addPlayersQuery =
      players.length &&
      (await pool.query(
        `INSERT INTO users_game (user_id, game_id) VALUES ${playersAddValues} RETURNING *`
      ));

    const addPlayersRows = players.length ? addPlayersQuery.rows : [];

    const playersScoresAddValues = players
      .map(playerId => `(${gameId}, ${playerId}, 0)`)
      .join(', ');

    players.length &&
      (await pool.query(
        `INSERT INTO scores (game_id, user_id, score) VALUES ${playersScoresAddValues}`
      ));

    await client.query('COMMIT');
    return { ...addGameRows[0], players: addPlayersRows };
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
  } finally {
    client.release();
  }
};

const endGame = async gameId => {
  const { rows } = await pool.query(
    `UPDATE games SET is_finish = true WHERE id = ${gameId} RETURNING *`
  );
  return rows[0];
};

module.exports = { getAllGames, getGameById, getGameUsers, addGame, endGame };

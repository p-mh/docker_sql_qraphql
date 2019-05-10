const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'gamedb',
  password: 'userpwd',
  port: 5432,
});

const getGameScores = async gameId => {
  const { rows } = await pool.query(
    `SELECT * FROM scores WHERE game_id = ${gameId}`
  );
  return rows;
};

const changeScore = async (gameId, userId, score) => {
  const { rows } = await pool.query(
    `UPDATE scores SET score = ${score} WHERE game_id = ${gameId} AND user_id = ${userId} RETURNING *`
  );
  return rows[0];
};

module.exports = { getGameScores, changeScore };

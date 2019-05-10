const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'gamedb',
  password: 'userpwd',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getGamesNb = async () => {
  const { rows } = await pool.query(
    'SELECT COUNT (*) FROM games WHERE is_finish = false'
  );
  return rows[0];
};

const getGamesPlayers = async () => {
  const { rows } = await pool.query(
    'SELECT MAX(nbUsers), MIN(nbUsers), AVG(nbUsers) FROM (SELECT game_id, count(user_id) AS nbUsers FROM users_game GROUP BY (game_id)) AS r;'
  );
  return rows[0];
};

const getScoresNb = async () => {
  const { rows } = await pool.query('SELECT COUNT (*) FROM scores');
  return rows[0];
};

const getBestScores = async () => {
  const { rows } = await pool.query(
    'SELECT game_id, user_id, score FROM scores WHERE score = (SELECT MAX(score) FROM scores)'
  );
  console.log(rows);
  return rows[0];
};

module.exports = {
  getGamesNb,
  getGamesPlayers,
  getScoresNb,
  getBestScores,
};

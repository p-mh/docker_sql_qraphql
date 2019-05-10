const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'gamedb',
  password: 'userpwd',
  port: 5432,
});

const getAllUsers = async () => {
  const { rows } = await pool.query(`SELECT * FROM users`);
  return rows;
};

const getUserById = async id => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  return rows[0];
};

const getGameUsers = async gameId => {
  const { rows } = await pool.query(
    `SELECT * FROM users u, users_game ug WHERE u.id = ug.user_id AND ug.game_id = ${gameId}`
  );
  return rows;
};

module.exports = { getAllUsers, getUserById, getGameUsers };

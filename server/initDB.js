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

const tables = [
  'CREATE TABLE users (id BIGSERIAL, username TEXT)',
  'CREATE TABLE games (id BIGSERIAL, is_finish BOOLEAN)',
  'CREATE TABLE scores (id BIGSERIAL, game_id BIGINT, user_id BIGINT, score BIGINT)',
  'CREATE TABLE users_game (user_id BIGINT, game_id BIGINT)',
];

const users = [
  "INSERT INTO users (username) VALUES ('toto')",
  "INSERT INTO users (username) VALUES ('tutu')",
  "INSERT INTO users (username) VALUES ('tata')",
];

const games = [
  'INSERT INTO games (is_finish) VALUES (false)',
  'INSERT INTO games (is_finish) VALUES (false)',
  'INSERT INTO games (is_finish) VALUES (false)',
];

const scores = [
  'INSERT INTO scores (game_id, user_id, score) VALUES (3, 1, 123)',
  'INSERT INTO scores (game_id, user_id, score) VALUES (3, 2, 456)',
  'INSERT INTO scores (game_id, user_id, score) VALUES (3, 3, 333)',
  'INSERT INTO scores (game_id, user_id, score) VALUES (2, 1, 555)',
  'INSERT INTO scores (game_id, user_id, score) VALUES (2, 3, 12)',
];

const usersGame = [
  'INSERT INTO users_game (user_id, game_id) VALUES (1,3)',
  'INSERT INTO users_game (user_id, game_id) VALUES (2,3)',
  'INSERT INTO users_game (user_id, game_id) VALUES (3,3)',
  'INSERT INTO users_game (user_id, game_id) VALUES (1,2)',
  'INSERT INTO users_game (user_id, game_id) VALUES (3,2)',
];

const dropTables = async () => {
  const result = await pool.query(
    'DROP TABLE users, scores, games, users_game'
  );
  console.log(result);
};

const createTables = async () => {
  const res = await Promise.all(tables.map(table => pool.query(table)));
  console.log(res);
};

const createGames = async () => {
  const res = await Promise.all(games.map(game => pool.query(game)));
  console.log(res);
};

const createUsers = async () => {
  const res = await Promise.all(users.map(user => pool.query(user)));
  console.log(res);
};

const createScores = async () => {
  const res = await Promise.all(scores.map(score => pool.query(score)));
  console.log(res);
};

const createUsersGame = async () => {
  const res = await Promise.all(
    usersGame.map(userGame => pool.query(userGame))
  );
  console.log(res);
};

const initDB = async () => {
  await dropTables();
  await createTables();
  await createGames();
  await createUsers();
  await createScores();
  await createUsersGame();
  // await pool.end();
};

console.log('oojil');
initDB();

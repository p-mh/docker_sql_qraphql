const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const {
  getGamesNb,
  getGamesPlayers,
  getScoresNb,
  getBestScores,
} = require('./services/statCalls');

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.get('/games', async (req, res) => {
  const gameNb = await getGamesNb();
  const players = await getGamesPlayers();
  const scores = await getScoresNb();
  const bestScore = await getBestScores();
  res.json({ gameNb, players, scores, bestScore });
});

app.listen(8080, () => console.log('server started'));

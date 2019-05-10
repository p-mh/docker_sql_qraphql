const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const {
  getAllGames,
  getGameById,
  getGameUsers,
  addGame,
  endGame,
} = require('../services/gamesCalls');
const { getAllUsers, getUserById } = require('../services/usersCalls');
const { getGameScores, changeScore } = require('../services/scoresCalls');
const { UserType, GameType, ScoreType } = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parents, args) => {
        return await getUserById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parents, args) => await getAllUsers(),
    },
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => await getGameById(args.id),
    },
    games: {
      type: new GraphQLList(GameType),
      resolve: async (parents, args) => await getAllGames(),
    },
    gamescores: {
      type: new GraphQLList(ScoreType),
      args: {
        game_id: { type: GraphQLID },
      },
      resolve: async (parents, args) => await getGameScores(args.game_id),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGame: {
      type: GameType,
      args: {
        players: { type: new GraphQLList(GraphQLID) },
      },
      resolve: async (parents, args) => {
        const game = await addGame(args.players);
        return game;
      },
    },
    changeScore: {
      type: ScoreType,
      args: {
        game_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        score: { type: GraphQLInt },
      },
      resolve: async (parents, args) => {
        const score = await changeScore(args.game_id, args.user_id, args.score);
        return score;
      },
    },
    endGame: {
      type: GameType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parents, args) => {
        const game = await endGame(args.id);
        return game;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

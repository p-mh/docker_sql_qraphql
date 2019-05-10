const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const { getGameUsers } = require('../services/gamesCalls');

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  }),
});

const GameType = new GraphQLObjectType({
  name: 'game',
  fields: () => ({
    id: { type: GraphQLID },
    is_finish: { type: GraphQLBoolean },
    players: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => await getGameUsers(parent.id),
    },
  }),
});

const ScoreType = new GraphQLObjectType({
  name: 'score',
  fields: () => ({
    game_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    score: { type: GraphQLInt },
  }),
});

module.exports = { UserType, GameType, ScoreType };

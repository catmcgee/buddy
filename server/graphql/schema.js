// const { buildSchema } = require('graphql');

// module.exports = buildSchema(`
//   type Like {
//     swiperId: String!
//     targetId: String!
//     liked: Boolean!
//   }

//   input LikeInput {
//     swiperId: String!
//     targetId: String!
//     liked: Boolean!
//   }

//   type RootQuery {
//     likes: [Like!]!
//     allMatches(userId: ID!): [ID]
//   }

//   type RootMutation {
//     createLike(likeInput: LikeInput): Like
//   }

//   schema {
//     query: RootQuery
//     mutation: RootMutation
//   }
// `);

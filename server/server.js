const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/config');

// Initialize a new Sequelize instance
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres',
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import your model
const Like = require('./models/Like')(sequelize);

// Sync the model with the database
Like.sync()
  .then(() => console.log('Like table created successfully'))
  .catch(err => console.error('Error creating Like table:', err));


  const schema = buildSchema(`
  type Like {
    swiperId: String!
    targetId: String!
    liked: Boolean!
  }

  input LikeInput {
    swiperId: String!
    targetId: String!
    liked: Boolean!
  }

  type Query {
    getLikes: [Like]!
    allMatches(userId: ID!): [ID]!
  }

  type Mutation {
    createLike(likeInput: LikeInput): Like
  }
`);

const root = {
  getLikes: async () => {
    try {
      const likes = await Like.findAll();
      return likes;
    } catch (err) {
      throw err;
    }
  },
  createLike: async ({ likeInput: { swiperId, targetId, liked } }) => {
    try {
      const newLike = await Like.create({
        swiperId,
        targetId,
        liked
      });
      return newLike;
    } catch (err) {
      throw err;
    }
  },
  allMatches: async ({ userId }) => {
    // Find all likes where the swiperId is the current user and they liked the target
    const userLikes = await Like.findAll({
      where: { swiperId: userId, liked: true }
    });
    
    // Extract the targetIds from the user's likes
    const likedUserIds = userLikes.map(like => like.targetId);
    
    // Find all likes where the targetId is the current user and they liked the swiper
    const otherUserLikes = await Like.findAll({
      where: { targetId: userId, liked: true, swiperId: likedUserIds }
    });

    // Extract the swiperIds from the other users' likes
    const otherLikedUserIds = otherUserLikes.map(like => like.swiperId);
    
    // Find the intersection of likedUserIds and otherLikedUserIds to find matches
    const matchedUserIds = likedUserIds.filter(userId => otherLikedUserIds.includes(userId));

    // Return the matched user IDs
    return matchedUserIds;
  },
};


const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Running a GraphQL API server at localhost:4000/graphql'));

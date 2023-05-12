// const { Like } = require('../models');

// const resolvers = {
//   Mutation: {
//     createLike: async (_, { likeInput }) => {
//       try {
//         const newLike = await Like.create({
//           swiperId: likeInput.swiperId,
//           targetId: likeInput.targetId,
//           liked: likeInput.liked,
//         });

//         return newLike;
//       } catch (error) {
//         console.error(error);
//         throw new Error('Error creating Like');
//       }
//     },
//   },
//   Query: {
//     allMatches: async (parent, args, { db }) => {
//       // Find all likes where the swiperId is the current user and they liked the target
//       const userLikes = await db.Like.findAll({
//         where: { swiperId: args.userId, liked: true }
//       });
      
//       // Extract the targetIds from the user's likes
//       const likedUserIds = userLikes.map(like => like.targetId);
      
//       // Find all likes where the targetId is the current user and they liked the swiper
//       const otherUserLikes = await db.Like.findAll({
//         where: { targetId: args.userId, liked: true, swiperId: likedUserIds }
//       });

//       // Extract the swiperIds from the other users' likes
//       const otherLikedUserIds = otherUserLikes.map(like => like.swiperId);
      
//       // Find the intersection of likedUserIds and otherLikedUserIds to find matches
//       const matchedUserIds = likedUserIds.filter(userId => otherLikedUserIds.includes(userId));

//       // Return the matched user IDs
//       return matchedUserIds;
//     },
//   },
// };

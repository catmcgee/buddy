import { gql } from '@apollo/client';

export const CREATE_LIKE_MUTATION = gql`
  mutation CreateLike($swiperId: String!, $targetId: String!, $liked: Boolean!) {
    createLike(likeInput: { swiperId: $swiperId, targetId: $targetId, liked: $liked }) {
      swiperId
      targetId
      liked
    }
  }
`;

export const ALL_MATCHES_QUERY = gql`
query AllMatches($userId: ID!) {
  allMatches(userId: $userId)
}
`;

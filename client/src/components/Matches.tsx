import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_MATCHES_QUERY } from '../graphql/swipe';
import useLensUser from '@/lib/auth/useLensUser';
import { client } from '../lib/apollo.js';

function Matches() {
  const { profileQuery } = useLensUser();
  const { data, loading, error } = useQuery(ALL_MATCHES_QUERY, {
    variables: {
      userId: profileQuery?.data?.defaultProfile?.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return ( 

    <div>
      <h1>My Matches</h1>
      {data.allMatches && data.allMatches.length > 0 ? (
        <ul>
         {data?.allMatches && data.allMatches.map((matchId: any) => (
  <li key={matchId.toString()}>
    Match ID: {matchId}
  </li>
))}

        </ul>
      ) : (
        <p>No matches yet. Get swiping!</p>
      )}
    </div>
  );
}

export default Matches;

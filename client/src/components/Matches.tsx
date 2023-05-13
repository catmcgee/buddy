import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_MATCHES_QUERY } from "../graphql/swipe";
import {
  useProfileQuery,
  ProfileQueryVariables,
} from "../graphql/generated";
import useLensUser from "@/lib/auth/useLensUser";

interface MatchedProfileProps {
  matchId: string;
}

const MatchedProfile: React.FC<MatchedProfileProps> = ({
  matchId,
}) => {
  const { data, error, isLoading } = useProfileQuery({
    request: { profileId: matchId },
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <li className="bg-white rounded-lg shadow px-5 py-3 my-3 flex items-center justify-between">
      <div className="text-lg font-semibold text-gray-700">
        Match ID: {matchId}
      </div>
      <div className="text-sm text-gray-500">
        {data ? data?.profile?.name : "Loading..."}
      </div>
    </li>
  );
};

const Matches: React.FC = () => {
  const { profileQuery } = useLensUser();
  const { data, loading, error } = useQuery(
    ALL_MATCHES_QUERY,
    {
      variables: {
        userId: profileQuery?.data?.defaultProfile?.id,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  if (error)
    return (
      <div className="container max-w-lg mx-auto px-4 min-[512px]:px-0">
        <h1 className="text-3xl font-bold text-white mt-10 mb-5">
          My Matches
        </h1>
        {data?.allMatches && data.allMatches.length > 0 ? (
          <ul>
            {data.allMatches.map((matchId: any) => (
              <MatchedProfile
                key={matchId}
                matchId={matchId}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No matches yet.</p>
        )}
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 mt-10 mb-5">
        Your Matches
      </h1>
      {data?.allMatches && data.allMatches.length > 0 ? (
        <ul>
          {data.allMatches.map((matchId: any) => (
            <MatchedProfile
              key={matchId}
              matchId={matchId}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No matches yet.</p>
      )}
    </div>
  );
};

export default Matches;

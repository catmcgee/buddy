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
        <h1 className="text-3xl font-bold text-black mt-10 mb-5">
          My Matches
        </h1>
        {/* {data?.allMatches && data.allMatches.length > 0 ? (
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
        )} */}
        <ul className="match-list flex flex-col gap-4">
          <li className="match w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
            <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img
                className="w-full h-auto"
                src="../images/kevin.JPG"
                alt=""
              />
            </div>
            <div className="details flex flex-col w-full overflow-hidden">
              <div className="detail flex justify-start w-full items-center">
                <p className="text-xl font-bold min-[500px]:text-xl text-black">
                  Kevin Canlas
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-0">
                <p className="text-sm min-[500px]:text-base text-gray-500">
                  @kvncnls.lens
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-4 overflow-hidden">
                <p className="bio text-sm min-[500px]:text-base text-black w-96 whitespace-nowrap overflow-hidden text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit...
                </p>
              </div>
            </div>
          </li>
        </ul>
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

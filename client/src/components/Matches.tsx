/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_MATCHES_QUERY } from "../graphql/swipe";
import {
  useProfileQuery,
  ProfileQueryVariables,
} from "../graphql/generated";
import useLensUser from "@/lib/auth/useLensUser";
import { useRouter } from "next/router";

interface MatchedProfileProps {
  matchId: string;
  image: string;
}

const MatchedProfile: React.FC<MatchedProfileProps> = ({
  matchId,
}) => {
  const router = useRouter();
  const { data, error, isLoading } = useProfileQuery({
    request: { profileId: matchId },
  });
  const handleClick = () => {
    router.push(`/conversation/${matchId}`);
  };
  if (isLoading) return <p>Loading matches...</p>;
  if (error) return <p>Error loading matches</p>;

  return (
      <li onClick={handleClick}

      className="w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">

      <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
        <img
          className="w-full h-auto"
          src={(
            data?.profile?.picture?.original?.url
          ).replace(
            "ipfs://",
            "https://cloudflare-ipfs.com/ipfs/"
          )}
          alt=""
        />
      </div>
      <div className="details flex flex-col w-full overflow-hidden">
        <div className="detail flex justify-start w-full items-center">
          <p className="name text-xl font-bold min-[500px]:text-xl text-black">
            {data ? data?.profile?.name : "Loading..."}
          </p>
        </div>
        <div className="detail flex justify-start w-full items-center mt-0">
          <p className="lens-id text-sm min-[500px]:text-base text-gray-500">
            {data ? data?.profile?.handle : "Loading handle..."}
          </p>
        </div>
        <div className="detail flex justify-start w-full items-center mt-4 overflow-hidden">
          <p className="bio text-sm min-[500px]:text-base text-black w-96 whitespace-nowrap overflow-hidden text-ellipsis">
            {data ? data?.profile?.bio : "Loading bio..."}
          </p>
        </div>
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
  return (
    <div className="container mx-auto px-4 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mt-10 mb-5">
        My Matches
      </h1>
      {data?.allMatches && data.allMatches.length > 0 ? (
        <ul>
          {data.allMatches.map((matchId: any) => (
            <MatchedProfile
              key={matchId}
              matchId={matchId}
              image={data?.profile?.image}
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

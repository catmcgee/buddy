/* eslint-disable @next/next/no-img-element */
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
  image: string;
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
      <li className="match kevin w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
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

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="container max-w-lg mx-auto px-4 min-[540px]:px-0">
        <h1 className="text-3xl font-bold text-black mt-10 mb-5">
          My Matches
        </h1>
              ) : (
          <p className="text-gray-600">No matches yet.</p>
        )
        <ul className="match-list flex flex-col gap-4">
          <li className="match kevin w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
            <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img
                className="w-full h-auto"
                src="../images/kevin.JPG"
                alt=""
              />
            </div>
            <div className="details flex flex-col w-full overflow-hidden">
              <div className="detail flex justify-start w-full items-center">
                <p className="name text-xl font-bold min-[500px]:text-xl text-black">
                  Kevin Canlas
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-0">
                <p className="lens-id text-sm min-[500px]:text-base text-gray-500">
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
          <li className="match hover:bg-gray-100 cat w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
            <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img
                className="w-full h-auto"
                src="../images/cat.jpeg"
                alt=""
              />
            </div>
            <div className="details flex flex-col w-full overflow-hidden">
              <div className="detail flex justify-start w-full items-center">
                <p className="name text-xl font-bold min-[500px]:text-xl text-black">
                  Cat McGee
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-0">
                <p className="lens-id text-sm min-[500px]:text-base text-gray-500">
                  @CatMcGeeCode.lens
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
          <li className="match hover:bg-gray-100 kevin w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
            <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img
                className="w-full h-auto"
                src="../images/kevin.JPG"
                alt=""
              />
            </div>
            <div className="details flex flex-col w-full overflow-hidden">
              <div className="detail flex justify-start w-full items-center">
                <p className="name text-xl font-bold min-[500px]:text-xl text-black">
                  Kevin Canlas
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-0">
                <p className="lens-id text-sm min-[500px]:text-base text-gray-500">
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
          <li className="match hover:bg-gray-100 cat w-full h-auto py-4 flex items-start justify-start border-b-2 border-gray-100 gap-4 cursor-pointer">
            <div className="image-container min-w-[80px] w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img
                className="w-full h-auto"
                src="../images/cat.jpeg"
                alt=""
              />
            </div>
            <div className="details flex flex-col w-full overflow-hidden">
              <div className="detail flex justify-start w-full items-center">
                <p className="name text-xl font-bold min-[500px]:text-xl text-black">
                  Cat McGee
                </p>
              </div>
              <div className="detail flex justify-start w-full items-center mt-0">
                <p className="lens-id text-sm min-[500px]:text-base text-gray-500">
                  @CatMcGeeCode.lens
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

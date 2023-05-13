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
          <li className="match w-full h-auto px-4 py-4 flex items-start justify-start border-b-2 border-gray-700 gap-4 cursor-pointer">
            <div className="image-container w-32 h-auto min-[420px]:w-48 min-[420px]:h-auto">
              <img src="../images/kevin.JPG" alt="" />
            </div>
            <div className="details flex flex-col gap-4 w-full">
              <div className="detail flex justify-between w-full items-center">
                <h4 className="font-bold text-black">Name</h4>
                <p className="text-sm min-[500px]:text-base text-black">Kevin Canlas</p>
              </div>
              <div className="detail flex justify-between w-full items-center">
                <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16 8V13.5C16 14.8807 17.1193 16 18.5 16C20.6808 16 21 13.7332 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.0519 21 14.0617 20.8195 15 20.4879M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm min-[500px]:text-bas text-black">@kvncnls.lens</p>
              </div>
              <div className="detail flex justify-between w-full items-center">
                <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20.9608 5.25489C21.1399 4.84457 20.6691 4.49899 20.2745 4.71049C19.6557 5.04213 19.0045 5.31177 18.3302 5.5148C15.6161 2.12518 10.94 4.97882 11.631 8.63441C11.6534 8.75303 11.5652 8.86786 11.4445 8.86559C8.90196 8.81779 7.10701 7.99065 5.37498 6.04184C5.12908 5.76516 4.69391 5.7782 4.50788 6.09821C3.36354 8.06663 0.538612 14.1724 7.80588 16.6205C6.38468 17.5852 4.53053 18.4045 3.58068 18.7963C3.34575 18.8932 3.33572 19.2266 3.56743 19.3309C13.0505 23.6026 22.2799 17.3808 19.3574 7.58866C20.0384 6.91712 20.5813 6.12419 20.9608 5.25489Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <p className="text-sm min-[500px]:text-base text-black">@kvncnls</p>
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

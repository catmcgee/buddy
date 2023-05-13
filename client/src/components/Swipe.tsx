import React, {
  useState,
  useCallback,
  useRef,
} from "react";
import TinderCard from "react-tinder-card";
import { useRecommendedProfilesQuery } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import { CREATE_LIKE_MUTATION } from "../graphql/swipe";
import useLensUser from "@/lib/auth/useLensUser";

type SwipeDirection = "left" | "right";

function Swipe() {
  type Profile = {
    id: string;
    name: string | null | undefined;
    bio: string | null | undefined;
    picture: any;
  };

  const { data, error, isLoading } =
    useRecommendedProfilesQuery();
  const [createLike] = useMutation(CREATE_LIKE_MUTATION);

  // Map the fetched data to an array of profiles
  const profiles: Profile[] =
    data?.recommendedProfiles.map(
      (profile): Profile => ({
        id: profile.id,
        name: profile.name,
        bio: profile.bio,
        picture: profile.picture || null,
      })
    ) || [];

  const [lastDirection, setLastDirection] =
    useState<SwipeDirection | null>(null);
  const [swipedProfiles, setSwipedProfiles] = useState<
    string[]
  >([]);
  const tinderCardRef = useRef<any>(null);
  const { profileQuery } = useLensUser();

  const onSwipe = useCallback(
    async (direction: SwipeDirection, id: string) => {
      setLastDirection(direction);
      setSwipedProfiles((prevSwipedProfiles) => [
        ...prevSwipedProfiles,
        id,
      ]);

      if (direction === "right") {
        // Only call createLike when swiping right
        try {
          const { data } = await createLike({
            variables: {
              swiperId:
                profileQuery?.data?.defaultProfile?.id,
              targetId: id,
              liked: true,
            },
          });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [createLike, profileQuery?.data?.defaultProfile?.id]
  );

  const filteredUsers = profiles.filter(
    (user) => !swipedProfiles.includes(user.id)
  );

  const onButtonClick = (direction: SwipeDirection) => {
    if (tinderCardRef.current && filteredUsers.length > 0) {
      tinderCardRef.current.swipe(direction);
    }
  };

  return (
    <div className="main-container relative flex flex-col items-center justify-center w-full min-h-screen h-auto">
      <div className="title-container w-full max-w-lg">
        <h1 className="text-white text-3xl font-bold absolute top-10  px-4 min-[512px]:px-0">
          Discover
        </h1>
      </div>
      <div className="card-container rounded-lg w-full min-h-screen h-auto absolute top-20 max-w-lg sm:rounded-lg">
        {filteredUsers.map((user, index) => (
          <TinderCard
            ref={index === 0 ? tinderCardRef : undefined}
            key={user.id}
            onSwipe={(dir) =>
              onSwipe(dir as SwipeDirection, user.id)
            }
            preventSwipe={["up", "down"]}
            className={`absolute rounded-lg  shadow-md w-full h-auto p-4 bg-white transform transition-all duration-300 ${
              index === 0 ? "z-10" : "hidden"
            }`}
          >
            <div className="pfp-container pointer-events-none w-full relative h-auto rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                className="pointer-events-none"
                src={(
                  user.picture?.original?.url ||
                  user.picture?.small?.url ||
                  user.picture?.medium?.url ||
                  "https://via.placeholder.com/150"
                ).replace(
                  "ipfs://",
                  "https://cloudflare-ipfs.com/ipfs/"
                )}
                className="pfp-image object-cover object-center w-full h-auto min-w-[240px] min-h-[240px]"
                alt={`${user.name} profile`}
              />
              <div className="main-details-container absolute w-full bottom-0 p-4 bg-gradient-to-t from-black">
                <div className="name flex items-center space-x-2 -left-1 relative w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 15H8C5.79086 15 4 16.7909 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.7909 18.2091 15 16 15Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h2 className="text-2xl text-white">
                    {user.name}
                  </h2>
                </div>
                <p className="lens-handle text-sm">
                  @lenshandle.lens
                </p>
              </div>
            </div>

            <h3 className="details pointer-events-none text-2xl text-black font-bold mb-2">
              Bio
            </h3>
            <div className="bio flex space-x-2 pointer-events-none">
              <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.35 17.4V18.75M4.35 18.75V20.1M4.35 18.75H5.7M4.35 18.75H3M12.9 3L13.2202 5.51971C13.6243 8.69877 16.0808 11.2281 19.2467 11.7249L21 12L19.2467 12.2751C16.0808 12.7719 13.6243 15.3012 13.2202 18.4803L12.9 21L12.5798 18.4803C12.1757 15.3012 9.71919 12.7719 6.5533 12.2751L4.8 12L6.5533 11.7249C9.71919 11.2281 12.1757 8.69877 12.5798 5.51971L12.9 3ZM5.7 3L5.76713 3.40758C5.95525 4.54964 6.85036 5.44475 7.99242 5.63286L8.4 5.7L7.99242 5.76713C6.85036 5.95525 5.95525 6.85036 5.76713 7.99242L5.7 8.4L5.63286 7.99242C5.44475 6.85036 4.54964 5.95525 3.40758 5.76713L3 5.7L3.40758 5.63286C4.54964 5.44475 5.44475 4.54964 5.63286 3.40758L5.7 3Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <p className="text-base text-black mb-2">
                {user.bio}
              </p>
            </div>
            <div className="ens flex space-x-2">
              <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.09 3.42847C10.7429 2.6349 11.0693 2.23812 11.4637 2.09447C11.8095 1.96851 12.1905 1.96851 12.5363 2.09447C12.9307 2.23812 13.2571 2.6349 13.91 3.42847L17.7721 8.11966C18.5644 9.08267 18.9605 9.56417 18.9957 10.0229C19.0265 10.4236 18.8891 10.8194 18.6149 11.1201C18.3009 11.4642 17.6857 11.6137 16.4553 11.9128L12.9887 12.7555C12.6202 12.8451 12.436 12.8899 12.2493 12.9078C12.0835 12.9236 11.9165 12.9236 11.7507 12.9078C11.564 12.8899 11.3798 12.8451 11.0113 12.7555L7.54467 11.9128C6.31426 11.6137 5.69905 11.4642 5.38514 11.1201C5.11086 10.8194 4.97346 10.4236 5.00425 10.0229C5.0395 9.56417 5.43564 9.08267 6.22793 8.11966L10.09 3.42847Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.8421 20.7253C13.2066 21.4315 12.8888 21.7847 12.5123 21.9145C12.1818 22.0285 11.821 22.0285 11.4904 21.9145C11.1139 21.7847 10.7961 21.4315 10.1606 20.7253L6.69334 16.5332C6.1476 15.9267 5.87473 15.6234 5.88537 15.4228C5.89456 15.2496 5.99627 15.0936 6.15352 15.0116C6.33561 14.9167 6.73405 15.0274 7.53092 15.2488L10.8873 16.1813C11.304 16.297 11.5123 16.3549 11.7242 16.3779C11.9123 16.3984 12.1022 16.3984 12.2903 16.3779C12.5022 16.3549 12.7105 16.297 13.1272 16.1813L16.4836 15.2488C17.2804 15.0274 17.6789 14.9167 17.861 15.0116C18.0182 15.0936 18.1199 15.2496 18.1291 15.4228C18.1397 15.6234 17.8669 15.9267 17.3211 16.5332L13.8421 20.7253Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <h4 className="text-base text-black mb-2">
                ENS Address Here
              </h4>
            </div>
            <div className="twitter flex space-x-2">
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
                  />
                </svg>
              </div>

              <h4 className="text-base text-black mb-2">
                Twitter Address Here
              </h4>
            </div>
            <h3 className="zoinks pointer-events-none text-2xl text-black font-bold my-2">
              Zoinks
            </h3>
            <div className="zoinks-container flex flex-wrap justify-start items-start max-w-max gap-4">
              <button className="zoinks-item rounded-full flex justify-center items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300">
                <div className="icon w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.735 14.1556C18.1274 12.8762 19 11.04 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 11.1635 5.98154 13.0978 7.52363 14.3819M16.735 14.1556C15.4887 15.3008 13.826 16 12 16C10.2976 16 8.73705 15.3922 7.52363 14.3819M16.735 14.1556L18.5 22L18.1414 21.7793C14.3983 19.4759 9.65688 19.5621 6 22L7.52363 14.3819"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="zoinks-title text-sm text-black font-normal">
                  Hackathon Winner
                </p>
              </button>
              <button className="zoinks-item rounded-full flex justify-center items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300">
                <div className="icon w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 8H16M8 12H13M12 21H9.4C7.15979 21 6.03969 21 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3 17.9603 3 16.8402 3 14.6V9.4C3 7.15979 3 6.03969 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C6.03969 3 7.15979 3 9.4 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V11M15.72 18.96L16.72 20.2933C17.1542 20.8723 17.3714 21.1618 17.6375 21.2653C17.8707 21.356 18.1293 21.356 18.3625 21.2653C18.6286 21.1618 18.8458 20.8723 19.28 20.2933L20.28 18.96C20.5382 18.6157 20.6673 18.4436 20.7171 18.2546C20.761 18.0877 20.761 17.9123 20.7171 17.7454C20.6673 17.5564 20.5382 17.3843 20.28 17.04L19.28 15.7067C18.8458 15.1277 18.6286 14.8382 18.3625 14.7347C18.1293 14.644 17.8707 14.644 17.6375 14.7347C17.3714 14.8382 17.1542 15.1277 16.72 15.7067L15.72 17.04C15.4618 17.3843 15.3327 17.5564 15.2829 17.7454C15.239 17.9123 15.239 18.0877 15.2829 18.2546C15.3327 18.4436 15.4618 18.6157 15.72 18.96Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="zoinks-title text-sm text-black font-normal">
                  Core ETH Contributor
                </p>
              </button>
              <button className="zoinks-item rounded-full flex justify-center items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300">
                <div className="icon w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.09 3.42847C10.7429 2.6349 11.0693 2.23812 11.4637 2.09447C11.8095 1.96851 12.1905 1.96851 12.5363 2.09447C12.9307 2.23812 13.2571 2.6349 13.91 3.42847L17.7721 8.11966C18.5644 9.08267 18.9605 9.56417 18.9957 10.0229C19.0265 10.4236 18.8891 10.8194 18.6149 11.1201C18.3009 11.4642 17.6857 11.6137 16.4553 11.9128L12.9887 12.7555C12.6202 12.8451 12.436 12.8899 12.2493 12.9078C12.0835 12.9236 11.9165 12.9236 11.7507 12.9078C11.564 12.8899 11.3798 12.8451 11.0113 12.7555L7.54467 11.9128C6.31426 11.6137 5.69905 11.4642 5.38514 11.1201C5.11086 10.8194 4.97346 10.4236 5.00425 10.0229C5.0395 9.56417 5.43564 9.08267 6.22793 8.11966L10.09 3.42847Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.8421 20.7253C13.2066 21.4315 12.8888 21.7847 12.5123 21.9145C12.1818 22.0285 11.821 22.0285 11.4904 21.9145C11.1139 21.7847 10.7961 21.4315 10.1606 20.7253L6.69334 16.5332C6.1476 15.9267 5.87473 15.6234 5.88537 15.4228C5.89456 15.2496 5.99627 15.0936 6.15352 15.0116C6.33561 14.9167 6.73405 15.0274 7.53092 15.2488L10.8873 16.1813C11.304 16.297 11.5123 16.3549 11.7242 16.3779C11.9123 16.3984 12.1022 16.3984 12.2903 16.3779C12.5022 16.3549 12.7105 16.297 13.1272 16.1813L16.4836 15.2488C17.2804 15.0274 17.6789 14.9167 17.861 15.0116C18.0182 15.0936 18.1199 15.2496 18.1291 15.4228C18.1397 15.6234 17.8669 15.9267 17.3211 16.5332L13.8421 20.7253Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="zoinks-title text-sm text-black font-normal">
                  Early ETH User
                </p>
              </button>
            </div>
            <div className="dislike-like mt-8 w-full flex justify-center space-x-4 z-20">
              <button
                className="flex items-center justify-center space-x-2 bg-red-500 w-[120px] h-[40px] text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-red-600"
                onClick={() => onButtonClick("left")}
              >
                <p className="text-base uppercase">Pass</p>
                <div className="icon w-4 h-4 aspect-square">
                  <svg
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M6.5 18L12.5 12M12.5 12L18.5 6M12.5 12L6.5 6M12.5 12L18.5 18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <button
                className="flex items-center justify-center space-x-2 bg-green-500 w-[120px] h-[40px] text-white font-medium text-sm px-6 pl-8 py-2 rounded-md hover:bg-green-600"
                onClick={() => onButtonClick("right")}
              >
                <p className="text-base uppercase">Match</p>
                <div className="icon w-4 h-4 aspect-square">
                  <svg
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M4.5 12.3744L9.8513 17.7199L10.2789 16.9723C12.5713 12.9638 15.7438 9.52807 19.5572 6.92405L20.5 6.28027"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* {lastDirection && (
        <div className="bg-black bg-opacity-50 text-white text-lg font-bold px-6 py-2 rounded-md mt-16 absolute top-4 z-20">
          {lastDirection === "left" ? "No!" : "Yes!"}
        </div>
      )} */}
      {/* <div className="dislike-like absolute bottom-8 flex space-x-4 z-20">
        <button
          className="bg-red-500 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-red-600"
          onClick={() => onButtonClick("left")}
        >
          Dislike
        </button>
        <button
          className="bg-green-500 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-green-600"
          onClick={() => onButtonClick("right")}
        >
          Like
        </button>
      </div> */}
      {filteredUsers.length === 0 && (
        <div className="text-center mt-16">
          <h2 className="text-xl font-bold mb-4">
            No more profiles to swipe
          </h2>
          <button
            className="bg-blue-500 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setSwipedProfiles([])}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Swipe;

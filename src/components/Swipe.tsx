import React, { useState, useCallback, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { useRecommendedProfilesQuery } from '@/graphql/generated';

type SwipeDirection = 'left' | 'right';

function Swipe() {

  type Profile = {
    id: string;
    name: string | null | undefined;
    bio: string | null | undefined;
    picture: any;
  };
  
  const { data, error, isLoading } = useRecommendedProfilesQuery({
   
  });

  // Map the fetched data to an array of profiles
  const profiles: Profile[] = data?.recommendedProfiles.map((profile): Profile => ({
    id: profile.id,
    name: profile.name,
    bio: profile.bio,
    picture: profile.picture || null,
  })) || [];
  
  // Replace the dummy users array with the fetched profiles

  const [lastDirection, setLastDirection] = useState<SwipeDirection | null>(null);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const tinderCardRef = useRef<any>(null);

  const onSwipe = useCallback(
    (direction: SwipeDirection, id: string) => {
      setLastDirection(direction);
      setSwipedProfiles([...swipedProfiles, id]);
    },
    [swipedProfiles]
  );  

  const filteredUsers = profiles.filter((user) => !swipedProfiles.includes(user.id));


  const onButtonClick = (direction: SwipeDirection) => {
    if (tinderCardRef.current && filteredUsers.length > 0) {
      tinderCardRef.current.swipe(direction);
    }
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="w-4/5 mt-10 relative">
        {filteredUsers.map((user, index) => (
         <TinderCard
         ref={index === 0 ? tinderCardRef : undefined}
         key={user.id}
         onSwipe={(dir) => onSwipe(dir as SwipeDirection, user.id)}
         preventSwipe={['up', 'down']}
         className={`absolute rounded-lg shadow-md w-full h-80 p-4 bg-white transform transition-all duration-300 ${
           index === 0 ? 'z-10' : 'hidden'
         }`}
       >
         <div className="w-full h-56 rounded-lg overflow-hidden mb-4 aspect-w-1 aspect-h-1">
           <img
             src={
               (user.picture?.original?.url ||
                 user.picture?.small?.url ||
                 user.picture?.medium?.url ||
                 'https://via.placeholder.com/150'
               ).replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
             }
             className="object-cover object-center w-full h-full"
             alt={`${user.name} profile`}
           />
         </div>
         <h2 className="text-lg font-bold mb-2">{user.name}</h2>
         <p className="text-gray-600 text-sm">{user.bio}</p>
       </TinderCard>
       
        ))}
      </div>
      {lastDirection && (
        <div className="bg-black bg-opacity-50 text-white text-lg font-bold px-6 py-2 rounded-md mt-16 absolute z-20">
          {lastDirection === 'left' ? 'No!' : 'Yes!'}
        </div>
      )}
      <div className="flex mt-10 space-x-4 z-20">
        <button
          className="bg-red-500 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-red-600"
          onClick={() => onButtonClick('left')}
        >
          Dislike
        </button>
        <button
          className="bg-green-500 text-white font-medium text-sm px-6 py-2 rounded-md hover:bg-green-600"
          onClick={() => onButtonClick('right')}
        >
          Like
        </button>
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center mt-16">
          <h2 className="text-xl font-bold mb-4">No more profiles to swipe</h2>
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

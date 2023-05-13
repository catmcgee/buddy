import React from "react";
import Link from "next/link";
import useLensUser from "@/lib/auth/useLensUser";
import { MediaRenderer } from "@thirdweb-dev/react";

function Profile() {
  const { isSignedInQuery, profileQuery } = useLensUser();

  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile.</div>;
  }

  if (profileQuery.data?.defaultProfile) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-1/2 mt-10">
          <h1 className="text-3xl font-bold mb-2">
            My Profile
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <MediaRenderer
                // @ts-ignore
                src={
                  profileQuery?.data?.defaultProfile
                    ?.picture?.original?.url || ""
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                }}
              />
              <div>
                <h2 className="text-xl font-bold">
                  {profileQuery?.data?.defaultProfile?.name}
                </h2>
                <p className="text-gray-600">
                  {
                    profileQuery?.data?.defaultProfile
                      ?.handle
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  My Proven Skills
                </h3>
                <div className="flex space-x-2">
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    ZK interest 1
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    ZK interest 2
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    Zk interest 3
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  My Bio
                </h3>
                <p className="text-gray-600">
                  {profileQuery?.data?.defaultProfile
                    ?.bio || "No bio yet"}
                </p>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Link href="/settings">
                  <button className="bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-blue-600">
                    Edit Profile
                  </button>
                </Link>
                <Link href="/settings">
                  <button className="bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-blue-600">
                    Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

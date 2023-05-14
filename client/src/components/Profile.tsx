import React from "react";
import Link from "next/link";
import useLensUser from "@/lib/auth/useLensUser";
import { MediaRenderer } from "@thirdweb-dev/react";

function Profile() {
  const { isSignedInQuery, profileQuery } = useLensUser();

  if (profileQuery.isLoading) {
    return (
      <div className="profile-component">Loading...</div>
    );
  }

  if (!profileQuery.data?.defaultProfile) {
    return (
      <div className="profile-component">
        No Lens Profile.
      </div>
    );
  }

  if (profileQuery.data?.defaultProfile) {
    return (
      <div className="profile-component flex flex-col items-center">
        <div className="w-full max-w-lg mt-10">
          <h1 className="text-3xl text-black font-bold mb-2 px-4 min-[540px]:px-0">
            My Profile
          </h1>
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="main-details flex flex-col space-y-4 min-[400px]:flex-row min-[400px]:space-y-0 min-[400px]:space-x-4 items-start justify-start mb-6">
              <div className="image-container w-full min-w-[120px] max-w-[360px] min-[400px]:w-[144px]">
                <MediaRenderer
                  // @ts-ignore
                  src={
                    profileQuery?.data?.defaultProfile
                      ?.picture?.original?.url || ""
                  }
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <div className="profile-detail w-full max-w-[300px]">
                <h2 className="text-2xl font-bold text-black mb-2">
                  {profileQuery?.data?.defaultProfile?.name}
                </h2>
                <div className="lens-handle flex space-x-2">
                  <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
                    <svg
                      className="w-full h-auto aspect-square"
                      xmlns="http://www.w3.org/2000/svg"
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
                  <p className="text-base text-black mb-2">
                    {
                      profileQuery?.data?.defaultProfile
                        ?.handle
                    }
                  </p>
                </div>

                <div className="ens flex space-x-2">
                  <div className="icon-container w-6 h-6 aspect-square flex justify-center items-center">
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

                  <h4 className="text-base text-black mb-2">
                    {
                      profileQuery.data?.defaultProfile
                        ?.onChainIdentity?.ens?.name
                    }
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
                    <a
                      href={
                        "http://www.twitter.com/" +
                        profileQuery?.data?.defaultProfile
                          ?.attributes?.[8]?.value
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        profileQuery?.data?.defaultProfile
                          ?.attributes?.[8]?.value
                      }
                    </a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  My Proven Skills
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    ZK Badge 1
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    ZK Badge 2
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    Zk Badge 3
                  </span>
                </div>
              </div>
              <div>
                <div className="bio-title flex justify-start items-center space-x-2 mb-2">
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

                  <h3 className="text-lg font-bold text-black">
                    My Bio
                  </h3>
                </div>
                <p className="text-gray-600">
                  {profileQuery?.data?.defaultProfile
                    ?.bio || "No bio yet"}
                </p>
              </div>
              {/* <div className="flex justify-end space-x-4 mt-6">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

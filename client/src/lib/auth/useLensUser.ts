import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "../../graphql/generated";

export default function useLensUser() {
  // 1. Make a react query for the local storage Key
  const address = useAddress();

  const localStorageQuery = useQuery(
    ["lens-user", address],
    // Writing the actual function to check the local storage
    () => readAccessToken()
  );

  // If there is a connected wallet address
  // Then we can ask for the default profile from Lens
  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address,
    }
  );

  console.log(profileQuery.data?.defaultProfile);

  return {
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  };
}
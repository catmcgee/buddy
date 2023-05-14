import {
  encodeAbiParameters,
} from "viem";
import { createContext } from 'react'


export const signMessage = (account: string) => {
    return encodeAbiParameters(
      [{ type: "address", name: "airdropAddress" }],
      [account as `0x${string}`]
    );
  };

export const MainContext = createContext<any>({})
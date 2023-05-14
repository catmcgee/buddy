import React, { useEffect } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

function ConnectComponent() {
  const signer = useSigner();

  useEffect(() => {
    async function connect() {
      if (signer) {
        const xmtp = await Client.create(signer, {
          env: 'production'
        });
      }
    }
    connect();
  }, [signer]);

//   const allConversations = await xmtp.conversations.list()

  
  return <div>Connecting...</div>;
}

export default ConnectComponent;

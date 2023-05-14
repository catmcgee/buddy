import React, { useEffect, useState } from "react";
import { Client, Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { useSigner } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import useLensUser from "@/lib/auth/useLensUser";
import { useProfileQuery } from "@/graphql/generated";

const XMTPComponent: React.FC<{ matchId?: string }> = ({ matchId }) => {
  const signer = useSigner();
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<DecodedMessage[]>([]);
    const [messageInput, setMessageInput] = useState(""); // New state variable for the text box

    const { profileQuery } = useLensUser();
    const { data, error, isLoading } = useProfileQuery({
      request: { profileId: matchId },
    });

  useEffect(() => {
    if (!matchId || !profileQuery.data) return;

    async function fetchConversationAndMessages() {

      if (signer) {
        const xmtp = await Client.create(signer, {
          env: "production",
        });

        const allConversations = await xmtp.conversations.list();

        const PREFIX = 'lens.dev/dm'
        const buildConversationId = (profileIdA: string, profileIdB: string) => {
        const profileIdAParsed = parseInt(profileIdA, 16)
        const profileIdBParsed = parseInt(profileIdB, 16)
        return profileIdAParsed < profileIdBParsed
         ? `${PREFIX}/${profileIdA}-${profileIdB}`
            : `${PREFIX}/${profileIdB}-${profileIdA}`
        }

        const conversationId = buildConversationId(profileQuery.data?.defaultProfile?.id, matchId)
        console.log(conversationId)
        const fetchedConversation = allConversations.find(conversation => conversation.context?.conversationId === conversationId);

        if (fetchedConversation) {
          setConversation(fetchedConversation);

          const conversationMessages = await fetchedConversation.messages();
          setMessages(conversationMessages);
        }
      }
    }

    fetchConversationAndMessages();
  }, [signer, profileQuery.data]); // Add `profileQuery.data` as a dependency here

  const sendMessage = async () => {
    if (signer && conversation && messageInput) {
      const xmtp = await Client.create(signer, {
        env: "production",
      });

      // Send the message
      await conversation.send(messageInput);

      // Clear the text box
      setMessageInput("");
    }
  };
  useEffect(() => {
    // New useEffect hook for streaming messages
    let stream: any;

    const streamMessages = async () => {
      if (conversation) {
        stream = await conversation.streamMessages();

        for await (const newMessage of stream) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      }
    };

    streamMessages();

    // Cleanup function
    return () => {
      if (stream && stream.close) {
        stream.close();
      }
    };
  }, [conversation]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      {conversation && (
        <div className="p-8">
          <h1 className="text-xl font-semibold">Conversation with {data?.profile?.name}</h1>
          <ul className="mt-6 space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="text-sm text-gray-700"> {message.content}</li>
            ))}
          </ul>
          <div className="mt-6 flex items-center">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message here"
              className="w-full border rounded-md p-2 mr-4"
            />
            <button onClick={sendMessage} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">Send Message</button>
          </div>
        </div>
      )}
      {!conversation && <p className="p-8">No conversation found.</p>}
    </div>
  );
}

export default XMTPComponent;
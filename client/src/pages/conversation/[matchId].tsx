import React from "react";
import { useRouter } from "next/router";
import XMTPComponent from "../../components/Conversation";
import Header from "@/components/Header";

const ConversationPage = () => {
  const router = useRouter();
  const { matchId } = router.query;

  return (
      <div>
        <Header />
        <main>
      <XMTPComponent matchId={matchId} />
      </main>
    </div>
  );
};

export default ConversationPage;

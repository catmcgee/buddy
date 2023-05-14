import React from "react";
import Header from "../components/Header";
import Matches from "../components/Matches";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";

function ProfilePage() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <main className="min-h-screen h-auto">
          <Matches />
        </main>
        <footer className="container max-w-lg w-full mx-auto p-4">
          <p className="text-black">
            Made by
            <a
              href="http://www.twitter.com/@catmcgeecode"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-500"
            >
              @catmcgeecode
            </a>{" "}
            &{" "}
            <a
              href="http://www.twitter.com/@kvncnls"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-500"
            >
              @kvncnls
            </a>
          </p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default ProfilePage;

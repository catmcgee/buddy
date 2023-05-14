import React from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo.js";

const Swipe = dynamic(() => import("../components/Swipe"), {
  ssr: false,
});

function Index() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <main className="min-h-screen h-auto pb-20">
          <Swipe />
        </main>
        <footer className="container max-w-lg w-full mx-auto p-4">
          {/* Footer content goes here */}
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

export default Index;

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
        <main>
          <Swipe />
        </main>
        <footer>{/* Footer content goes here */}</footer>
      </div>
    </ApolloProvider>
  );
}

export default Index;

import React from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import SignInButton from "@/components/SignInButton";

function ProfilePage() {
  return (
    <div>
      <Header />
      <main className="min-h-screen h-auto">
        <SignInButton />
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
  );
}

export default ProfilePage;

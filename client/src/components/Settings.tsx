import React, { useState } from "react";

const interests = [
  "Hackathon Winner",
  "Core ETH Contributor",
  "Early ETH User",
  "Crypto Bro",
];

function Settings() {
  const [selectedInterests, setSelectedInterests] =
    useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prev) =>
        prev.filter((int) => int !== interest)
      );
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  return (
    <div className="settings-component flex flex-col items-center">
      <div className="w-full max-w-lg mt-10">
        <h2 className="text-2xl font-bold text-black  px-4 min-[512px]:px-0">
          Preferences
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4 mt-2">
          <h2 className="text-xl text-black mb-2">
            What are you looking for in a hackathon partner?
          </h2>
          <p className="text-base text-gray-400 mb-4">
            Select all that apply
          </p>
          <div className="flex flex-wrap">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`text-sm font-medium py-2 px-4 rounded-full border ${
                  selectedInterests.includes(interest)
                    ? "bg-black text-white border-black hover:bg-gray-700 hover:border-gray-700"
                    : "bg-white text-gray-700 border-gray-400 hover:bg-gray-200 hover:border-gray-400"
                } mr-2 mb-2 focus:outline-none`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

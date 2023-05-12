import React from 'react';
import Link from 'next/link';

function Profile() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 mt-10">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User profile"
              className="w-24 h-24 rounded-full object-cover object-center mr-6"
            />
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">My ZK Traits</h3>
              <div className="flex space-x-2">
                <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                  Interest 1
                </span>
                <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                  Interest 2
                </span>
                <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                  Interest 3
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">My Bio</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget ante sit amet
                diam gravida consectetur. Donec suscipit euismod aliquam. Morbi hendrerit luctus
                tellus, vel blandit quam faucibus in.
              </p>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
  <Link href="/settings">
    <button className="bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-blue-600">
      Edit Profile
    </button>
  </Link>
  <Link href="/settings">
    <button className="bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-blue-600">
      Settings
    </button>
  </Link>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

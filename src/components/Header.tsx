import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md h-16 px-4">
      <div className="text-lg font-bold">
        <Link href="/">
          Buddy
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/profile" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer">
            Profile
          </div>
        </Link>
        <a href="#" className="text-gray-600 hover:text-black text-sm font-medium">
          Matches
        </a>
        <Link href="/settings" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer">
            Settings
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

import Link from 'next/link';

function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md h-16 px-4">
      <div className="text-lg font-bold">
        <Link href="/">
          Tinder
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
        <Link href="/settingsn" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer">
            Settings
          </div>
        </Link>
      </nav>
      <div className="flex items-center bg-gray-100 rounded-lg px-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none focus:ring-0 focus:border-black placeholder-gray-400 w-32"
        />
        <button className="bg-red-500 text-white font-medium text-sm px-4 py-2 rounded-md hover:bg-red-600">
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;

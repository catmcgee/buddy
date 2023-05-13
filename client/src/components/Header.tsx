import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md h-16 px-4">
      <div className="text-lg font-bold text-black">
        <Link href="/">Buddy</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 21V16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16V21M7.60561 5.65025L5.00561 8.1058C4.26632 8.80402 3.89667 9.15313 3.63191 9.56641C3.39721 9.93275 3.22385 10.3349 3.11866 10.7571C3 11.2334 3 11.7418 3 12.7587V14.6C3 16.8402 3 17.9603 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C6.03968 21 7.15979 21 9.4 21H14.6C16.8402 21 17.9603 21 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C21 17.9603 21 16.8402 21 14.6V12.7587C21 11.7418 21 11.2334 20.8813 10.7571C20.7761 10.3349 20.6028 9.93275 20.3681 9.56641C20.1033 9.15313 19.7337 8.80402 18.9944 8.1058L16.3944 5.65025C14.8479 4.18966 14.0746 3.45937 13.1925 3.18385C12.416 2.94132 11.584 2.94132 10.8075 3.18385C9.92537 3.45937 9.15211 4.18966 7.60561 5.65025Z"
                stroke="#14171F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Home</p>
          </div>
        </Link>
        <Link href="/matches" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.4098 7.20903L17.3974 9.55205C15.4711 11.0503 14.5079 11.7994 13.4398 12.0867C12.4976 12.3401 11.5024 12.3401 10.5602 12.0867C9.49205 11.7994 8.52891 11.0503 6.60263 9.55205L3.59018 7.20903M20.4098 7.20903C19.9756 6.46813 19.3272 5.86533 18.543 5.47685C17.5804 5 16.3202 5 13.8 5H10.2C7.67976 5 6.41965 5 5.45704 5.47685C4.67282 5.86533 4.02441 6.46813 3.59018 7.20903M20.4098 7.20903C20.4444 7.26809 20.4777 7.32802 20.5095 7.38879C21 8.32466 21 9.54977 21 12C21 14.4502 21 15.6753 20.5095 16.6112C20.0781 17.4344 19.3897 18.1037 18.543 18.5232C17.5804 19 16.3202 19 13.8 19H10.2C7.67976 19 6.41965 19 5.45704 18.5232C4.61031 18.1037 3.9219 17.4344 3.49047 16.6112C3 15.6753 3 14.4502 3 12C3 9.54977 3 8.32466 3.49047 7.38879C3.52232 7.32802 3.55557 7.26809 3.59018 7.20903"
                stroke="#14171F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Matches</p>
          </div>
        </Link>
        <Link href="/profile" passHref>
          <div className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#14171F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 15H8C5.79086 15 4 16.7909 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.7909 18.2091 15 16 15Z"
                stroke="#14171F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Profile</p>
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

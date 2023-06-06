import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <nav className="w-full my-2  gap-[5rem] pb-[0.5rem] border-b-[1px] border-gray-700">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <div className="flex flex-row gap-2 items-center text-3xl font-black">
              C.I.P
              </div>
              </Link>

              <div>
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="#161616"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#161616"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="-z-50">
            <div
              className={`flex-1  w-full justify-self-center pb-3  md:block md:pb-0 md:mt-0 ${
                navbar ? "block p-[1.8rem] pb-[2.5rem] mt-2  backdrop-blur-sm   bg-white-700/90" : "mt-8 hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white-600 font-medium hover:text-yellow-600">
                  <Link to="/search">Search</Link>
                </li>
                <li className="text-white-600 font-medium hover:text-yellow-600">
                <Link to="/inspect">Inspect</Link>
                </li>
                <li className="text-white-600 font-medium hover:text-yellow-600">
                <Link to="/add-criminals">Add to Database</Link>
                </li>
                <li className="text-white font-medium w-min py-4 px-6 rounded-lg bg-yellow-600">
                <Link to="/inspect">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../../assets/logo.png";
import links from "../../constants/links";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";

import t from "./text";

const Navbar = ({ isScrolled, isFixed = true }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (signedInUser) => {
      if (!signedInUser) navigate("/login");
    });
  }, []);

  const signOutUser = () => {
    signOut(firebaseAuth);
  };

  return (
    <div className={classNames("w-[100%] z-50", { fixed: isFixed })}>
      <nav
        className={classNames(
          "flex justify-between sticky top-0 w-[100%] py-4 px-6 md:px-20 transition-all duration-1000",
          {
            "bg-zinc-900": isScrolled,
          }
        )}
      >
        <div className="flex items-center">
          <div className="flex items-center-justify-center">
            <img
              src={netflixLogo}
              alt="netflix"
              className="h-[2rem] object-contain"
            />
          </div>
          <ul className="hidden md:flex mx-6 text-sm font-bold">
            {links.map(({ link, name }) => (
              <li
                key={name}
                className={classNames("px-4", {
                  "text-white": location.pathname === link,
                  "text-gray-400 hover:text-gray-500":
                    location.pathname !== link,
                })}
              >
                <Link to={link}>
                  {name}
                  {location.pathname === link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center max-w-[180px] md:max-w-2xl">
          <div
            className={classNames(
              "flex justify-end transition-[width] ease-in-out bg-zinc-900 md:bg-transparent",
              { "md:border md:rounded-sm md:bg-zinc-900": showSearch }
            )}
          >
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
              className={classNames("hidden md:block", { "mx-2": showSearch })}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              name="search"
              className={classNames(
                "w-full p-1 px-2 text-sm border md:border-none rounded-sm md:rounded-none bg-transparent text-white outline-none transition-[width] duration-1000 overflow-hidden",
                {
                  "md:block": showSearch,
                  "md:w-0": !showSearch,
                }
              )}
              placeholder={t.search()}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button
            className="block ml-2 md:ml-8 text-[#E50914]"
            onClick={signOutUser}
          >
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

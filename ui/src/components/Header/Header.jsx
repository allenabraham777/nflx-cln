import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import netflixLogo from "../../assets/logo.png";
import t from "./text";

const Header = ({ login }) => {
  const navigate = useNavigate();

  const redirect = () => {
    const url = login ? "/login" : "/signup";

    navigate(url);
  };

  return (
    <div className="w-[100%] py-4 px-8 flex items-center justify-between">
      <div>
        <img src={netflixLogo} alt="netflix" className="h-[3rem]" />
      </div>
      <button
        onClick={redirect}
        className={classNames(
          "py-2 px-4 bg-[#E50914] outline-none text-white cursor-pointer rounded-sm font-bold text-xs",
          { hidden: !login }
        )}
      >
        {t.buttonText()}
      </button>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import backgroundImage from "../../assets/dark.jpg";
import titleImage from "../../assets/dark-title.webp";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    document.title = "Home - Nextflix Clone";
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };

    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <div className="bg-zinc-900 text-white">
      <Navbar isScrolled={isScrolled} />
      <div className="hidden md:block relative max-h-[100vh]">
        <img
          src={backgroundImage}
          alt="background"
          className="object-cover w-[100%] max-h-[100vh] opacity-50"
        />
        <div className="absolute bottom-0 py-12 px-20 mb-20 max-w-2xl text-justify flex flex-col gap-4">
          <div>
            <img src={titleImage} alt="title" />
          </div>
          <p className="my-4">
            A missing child sets four families on a frantic hunt for answers as
            they unearth a mind-bending mystery that spans three generations.
          </p>
          <div className="flex">
            <button className="bg-white text-black py-2 px-4 flex items-center gap-2 text-lg font-bold rounded-md outline-none hover:opacity-90">
              <FaPlay />
              <span>Play</span>
            </button>
            <button className="ml-4 bg-[rgba(109,109,110,0.7)] py-2 px-4 flex items-center gap-2 text-lg font-bold rounded-md outline-none hover:opacity-90">
              <AiOutlineInfoCircle />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

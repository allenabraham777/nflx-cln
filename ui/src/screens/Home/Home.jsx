import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import constants from "../../constants/home";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";

import t from "./text";
import Slider from "../../components/Slider";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    document.title = "Home - Nextflix Clone";
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    dispatch(getGenres());

    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  return (
    <div className="bg-zinc-900 text-white relative -z-0">
      <Navbar isScrolled={isScrolled} />
      <div className="hidden md:block relative max-h-[100vh] -z-10">
        <img
          src={constants.cover.background}
          alt="background"
          className="object-cover w-[100%] max-h-[100vh] opacity-50"
        />
        <div className="absolute bottom-0 py-12 px-20 mb-20 max-w-2xl text-justify flex flex-col gap-4">
          <div>
            <img src={constants.cover.icon} alt="title" />
          </div>
          <p className="my-4">{constants.cover.description}</p>
          <div className="flex">
            <button
              className="bg-white text-black py-2 px-4 flex items-center gap-2 text-lg font-bold rounded-md outline-none hover:opacity-90"
              onClick={() => navigate("/player")}
            >
              <FaPlay />
              <span>{t.play()}</span>
            </button>
            <button className="ml-4 bg-[rgba(109,109,110,0.7)] py-2 px-4 flex items-center gap-2 text-lg font-bold rounded-md outline-none hover:opacity-90">
              <AiOutlineInfoCircle />
              <span>{t.info()}</span>
            </button>
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
};

export default Home;

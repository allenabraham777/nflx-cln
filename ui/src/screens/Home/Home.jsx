import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import constants from "../../constants/home";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";

import Slider from "../../components/Slider";
import LandingCard from "../../components/LandingCard";
import { generateCover } from "../../utils/tmdb";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const [cover, setCover] = useState({});

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

  useEffect(() => {
    generateCover(movies).then((cover) => setCover(cover));
  }, [movies]);

  return (
    <div className="text-white relative -z-0">
      <Navbar isScrolled={isScrolled} />
      <LandingCard cover={cover} />
      <Slider />
    </div>
  );
};

export default Home;

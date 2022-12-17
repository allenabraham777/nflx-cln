import classNames from "classnames";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandingCard from "../../components/LandingCard";
import SelectGenre from "../../components/misc/SelectGenre/SelectGenre";
import Navbar from "../../components/Navbar";
import NotAvailable from "../../components/NotAvailable/NotAvailable";
import Slider from "../../components/Slider";
import { fetchMovies, getGenres } from "../../store";
import { firebaseAuth } from "../../utils/firebase";
import { generateCover } from "../../utils/tmdb";

import t from "./text";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const [cover, setCover] = useState({});

  useEffect(() => {
    document.title = "TV Shows - Nextflix Clone";
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
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
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded]);

  useEffect(() => {
    if (movies.length)
      generateCover(movies, "tv").then((cover) => setCover(cover));
  }, [movies]);

  return (
    <div>
      <div
        className={classNames(
          "fixed flex flex-col top-0 w-[100%] z-50 transition-all duration-1000",
          {
            "bg-zinc-900": isScrolled,
          }
        )}
      >
        <div
          className={classNames(
            "overflow-hidden md:transition-all md:duration-1000",
            {
              "md:h-0 md:-translate-y-20": isScrolled,
              "md:h-16": !isScrolled,
            }
          )}
        >
          <Navbar isFixed={false} isScrolled={!isScrolled} />
        </div>
        <SelectGenre type={"tv"} title={t.title()} />
      </div>
      <div>
        {movies?.length ? (
          <>
            <LandingCard cover={cover} type={"tv"} />
            <Slider movies={movies} />
          </>
        ) : (
          <NotAvailable />
        )}
      </div>
    </div>
  );
};

export default Movies;

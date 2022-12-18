import classNames from "classnames";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar";
import { getFavourites } from "../../store";
import { firebaseAuth } from "../../utils/firebase";

import t from "./text";

const MyList = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    document.title = "Nextflix Clone";
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
      dispatch(getFavourites(currentUser.email));
    });
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div className="w-[100%] flex pb-96">
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
              "md:h-20": !isScrolled,
            }
          )}
        >
          <Navbar isFixed={false} isScrolled={!isScrolled} />
        </div>
        <h1
          className={classNames("text-2xl font-bold px-6 md:px-20", {
            "pt-4": isScrolled,
          })}
        >
          My List
        </h1>
      </div>
      {movies.length > 0 ? (
        <div className="mt-36 md:mt-40 px-6 md:px-20 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto">
          {movies.map((movie, index) => (
            <Card
              movie={movie}
              index={index}
              key={`${movie.id}-${index}`}
              isLiked
            />
          ))}
        </div>
      ) : (
        <h1 className="mt-72 px-20 text-center text-xl font-bold w-full text-gray-500">
          {t.message()}
        </h1>
      )}
    </div>
  );
};

export default MyList;

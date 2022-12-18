import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apis from "../../utils/apis";
import { firebaseAuth } from "../../utils/firebase";
import CardSlider from "../CardSlider/CardSlider";

import t from "./text";

const Slider = () => {
  const [favourites, setFavourites] = useState({});
  const [email, setEmail] = useState(null);
  const movies = useSelector((state) => state.netflix.movies);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      }
    });
  }, []);

  useEffect(() => {
    updateFavourites();
  }, [email]);

  const updateFavourites = async () => {
    const {
      data: { favourites },
    } = await apis.getFavourites(email);
    const favouritesMap = {};
    if (favourites.length) {
      favourites.forEach((fav) => {
        favouritesMap[fav.id] = true;
      });
    }
    setFavourites(favouritesMap);
  };

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div className="pt-12 md:pt-0 md:-mt-24 z-40  overflow-x-hidden pb-96">
      <CardSlider
        favourites={favourites}
        updateFavourites={updateFavourites}
        title={t.trending()}
        data={getMoviesFromRange(0, 10)}
      />
      <CardSlider
        favourites={favourites}
        updateFavourites={updateFavourites}
        title={t.topPicks()}
        data={getMoviesFromRange(10, 20)}
      />
      <CardSlider
        favourites={favourites}
        updateFavourites={updateFavourites}
        title={t.popular()}
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        favourites={favourites}
        updateFavourites={updateFavourites}
        title={t.topShows()}
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider
        favourites={favourites}
        updateFavourites={updateFavourites}
        title={t.newReleases()}
        data={getMoviesFromRange(40, 50)}
      />
    </div>
  );
};

export default Slider;

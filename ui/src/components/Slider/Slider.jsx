import { useSelector } from "react-redux";
import CardSlider from "../CardSlider/CardSlider";

import t from "./text";

const Slider = () => {
  const movies = useSelector((state) => state.netflix.movies);

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div className="pt-12 md:pt-0 md:-mt-24 z-40  overflow-x-hidden pb-96">
      <CardSlider title={t.trending()} data={getMoviesFromRange(0, 10)} />
      <CardSlider title={t.topPicks()} data={getMoviesFromRange(10, 20)} />
      <CardSlider title={t.popular()} data={getMoviesFromRange(20, 30)} />
      <CardSlider title={t.topShows()} data={getMoviesFromRange(30, 40)} />
      <CardSlider title={t.newReleases()} data={getMoviesFromRange(40, 50)} />
    </div>
  );
};

export default Slider;

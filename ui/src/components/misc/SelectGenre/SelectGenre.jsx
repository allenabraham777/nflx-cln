import { useDispatch, useSelector } from "react-redux";
import { fetchByGenre } from "../../../store";

const SelectGenre = ({ title, type }) => {
  const genres = useSelector((state) => state.netflix.genres) || [];
  const dispatch = useDispatch();

  const selectGenre = (e) => {
    dispatch(fetchByGenre({ genre: e.target.value, type }));
  };

  return (
    <div className="hidden md:flex py-4 px-12 gap-6 items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <select
        onChange={selectGenre}
        className="bg-zinc-900 border text-sm font-bold p-1"
      >
        <option value="all">All</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenre;

import config from "config";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import video from "../../assets/video.mp4";
import classNames from "classnames";

const Card = ({ movie, index, listRef, last }) => {
  const navigate = useNavigate();
  const isLiked = false;

  return (
    <div
      className="flex-shrink-0 group cursor-pointer max-w-[230px] w-[230px] relative bg-zinc-900 overflow-y-visible transition-all"
      onClick={() => navigate("/player")}
      ref={listRef}
    >
      <img
        src={`${config.application.tmdb.imageBaseUrl}/${movie.image}`}
        alt={`image-${movie.name}`}
        className="w-[100%] roundes-md"
      />
      <div className="hidden md:block">
        <div
          className={classNames(
            "transition-[width] hidden w-0 group-hover:block group-hover:w-[350px] group-hover:z-10 absolute top-0 -translate-y-1/4 bg-zinc-900 rounded-md shadow-md shadow-black overflow-hidden",
            {
              "left-0": !index,
              "-translate-x-[25px]": index && !last,
              "right-0": last,
            }
          )}
        >
          <img
            src={`${config.application.tmdb.imageBaseUrl}/${movie.image}`}
            alt={`image-${movie.name}`}
            className="w-[100%] roundes-md"
          />
          <video
            src={video}
            autoPlay
            loop
            muted
            className="w-[100%] absolute top-0"
          />
          <div className="flex flex-col px-4 py-8">
            <h3 className="text-xl font-bold">{movie.name}</h3>
            <div className="flex justify-between items-center my-4 text-3xl">
              <div className="flex gap-4">
                <IoPlayCircleSharp title="play" />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                <BsCheck
                  className={classNames({ hidden: !isLiked })}
                  title="Remove from list"
                />
                <BsCheck
                  className={classNames({ hidden: isLiked })}
                  title="Add to my list"
                />
              </div>
              <div className="rounded-full border-2">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="flex text-sm font-medium">
              <ul className="flex gap-1 items-center">
                {movie.genres.map((genre, index) => (
                  <>
                    <li key={genre}>{genre}</li>
                    <li
                      className={classNames({
                        hidden: index == movie.genres.length - 1,
                      })}
                    >
                      <RxDotFilled />
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

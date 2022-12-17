import { useState } from "react";
import config from "config";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import classNames from "classnames";
import { useRef } from "react";
import Video from "../Video";

const Card = ({ movie, index, listRef, last }) => {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const isLiked = false;
  const ref = useRef();

  const pushToScreen = () => {
    if (document.body.clientWidth >= 768) {
      setShowVideo(true);
    }
    const rect = ref.current.getBoundingClientRect();
    const rightPosition = rect.right - document.body.clientWidth;
    const leftPosition = rect.left;
    if (rightPosition > -100) ref.current.style.justifyContent = `flex-end`;
    if (leftPosition < 200) ref.current.style.justifyContent = `flex-start`;
  };

  const resetReposition = () => {
    setShowVideo(false);
    ref.current.style.justifyContent = `center`;
  };

  return (
    <div
      className="flex-shrink-0 group cursor-pointer max-w-[230px] w-[230px] relative bg-zinc-900 overflow-y-visible transition-all"
      onClick={() => navigate(`/player?id=${movie.id}&type=${movie.type}`)}
      ref={listRef}
      onMouseEnter={pushToScreen}
      onMouseLeave={resetReposition}
    >
      <img
        src={`${config.application.tmdb.imageBaseUrl}/w500/${movie.image}`}
        alt={`image-${movie.name}`}
        className="w-[100%] roundes-md"
      />
      <div className="hidden md:flex justify-center items-center" ref={ref}>
        <div className="transition-[width] hidden w-0 group-hover:animate-appear group-hover:block group-hover:w-[350px] group-hover:z-10 absolute top-0 -translate-y-[10%] bg-zinc-900 rounded-md shadow-md shadow-black overflow-hidden">
          <img
            src={`${config.application.tmdb.imageBaseUrl}/w500/${movie.image}`}
            alt={`image-${movie.name}`}
            className="w-[100%]"
          />
          {showVideo && (
            <div className="w-[100%] absolute h-[200px] top-0 left-0">
              <Video movie={movie} />
            </div>
          )}
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
                <AiOutlinePlus
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

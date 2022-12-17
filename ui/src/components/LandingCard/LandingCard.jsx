import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import t from "./text";

const LandingCard = ({ cover, cover: { id, type } }) => {
  const navigate = useNavigate();
  let query;

  if (id) {
    query = `id=${id}&`;
  }
  if (type) {
    query = `${query}type=${type}`;
  }

  return (
    <div className="hidden md:block relative max-h-[100vh]">
      <img
        src={cover.background}
        alt="background"
        className="object-cover w-[100%] max-h-[100vh] opacity-50 -z-30"
      />
      <div className="absolute bottom-0 py-12 px-20 mb-10 lg:mb-20 max-w-[100%] lg:max-w-2xl text-justify flex flex-col gap-4 z-40">
        <div>
          <img src={cover.icon} alt="title" className="max-h-16 lg:max-h-40" />
        </div>
        <p className="my-4 text-xs lg:text-[1.1rem] lg:leading-[1.6rem]">
          {cover.description}
        </p>
        <div className="flex items-center">
          <button
            className="bg-white text-black py-2 px-4 flex items-center gap-2 text-sm lg:text-lg font-bold rounded-md outline-none hover:opacity-90"
            onClick={() => navigate(`/player?${query}`)}
          >
            <FaPlay />
            <span>{t.play()}</span>
          </button>
          <button className="ml-4 bg-[rgba(109,109,110,0.7)] py-2 px-4 flex items-center gap-2 text-sm lg:text-lg font-bold rounded-md outline-none hover:opacity-90">
            <AiOutlineInfoCircle />
            <span>{t.info()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;

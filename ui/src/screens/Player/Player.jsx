import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../../assets/video.mp4";

const Player = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="absolute p-2 z-10 top-5 left-5 text-5xl text-white cursor-pointer">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      <video
        src={video}
        autoPlay
        loop
        controls
        muted
        className="h-[100%] w-[100%] bg-black"
      />
    </div>
  );
};

export default Player;

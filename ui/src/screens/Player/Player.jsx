import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import DummyVideo from "../../components/misc/DummyVideo";
import Video from "../../components/Video";

const Player = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="absolute p-2 z-10 top-5 left-5 text-5xl text-white cursor-pointer">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      {!id || !type ? (
        <DummyVideo />
      ) : (
        <Video
          movie={{ id, type }}
          options={{
            playerVars: {
              autoplay: 1,
              controls: 1,
            },
          }}
        />
      )}
    </div>
  );
};

export default Player;

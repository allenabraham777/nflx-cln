import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import { getVideo } from "../../utils/tmdb";

const Video = ({ movie: { id, type }, options }) => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    getVideo(type, id).then((video) => setVideo(video));
  }, []);

  const onReady = (e) => {
    e.target.playVideo();
  };

  return (
    <div className="w-[100%] h-[100%] top-0 left-0 relative">
      {!!video && (
        <YouTube
          videoId={video.key}
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 0,
            },
            ...options,
          }}
          iframeClassName="overflow-hidden overflow-x-hidden overflow-y-hidden absolute h-[100%] w-[100%] top-0 left-0 right-0 bottom-0"
          onReady={onReady}
        />
      )}
    </div>
  );
};

export default Video;

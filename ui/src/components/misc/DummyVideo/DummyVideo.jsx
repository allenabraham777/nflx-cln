import video from "../../../assets/video.mp4";

const DummyVideo = () => {
  return (
    <video
      src={video}
      autoPlay
      loop
      controls
      muted
      className="h-[100%] w-[100%] bg-black"
    />
  );
};

export default DummyVideo;

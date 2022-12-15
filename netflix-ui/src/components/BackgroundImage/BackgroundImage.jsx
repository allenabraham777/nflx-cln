import React from "react";
import backgroundSrc from "../../assets/background.jpg";

const BackgroundImage = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 -z-10  bg-black w-[100vw]">
      <img
        src={backgroundSrc}
        className="w-[100%] h-[100%] opacity-40 object-cover blur-[2px]"
      />
    </div>
  );
};

export default BackgroundImage;

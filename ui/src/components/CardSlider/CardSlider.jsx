import classNames from "classnames";
import { useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Card from "../Card/Card";

const CardSlider = ({ title, data }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();
  const lastRef = useRef();

  const handleDirection = (direction) => {
    const rightPosition =
      lastRef.current.getBoundingClientRect().x -
      document.body.clientWidth +
      240;
    const leftPosition = listRef.current.getBoundingClientRect().right;
    if (direction === "left" && rightPosition > 0) {
      listRef.current.style.marginLeft = `-${(sliderPosition + 1) * 240}px`;
      setSliderPosition(sliderPosition + 1);
    }
    if (direction === "right" && leftPosition < 80) {
      listRef.current.style.marginLeft = `-${(sliderPosition - 1) * 240}px`;
      setSliderPosition(sliderPosition - 1);
    }
  };

  return (
    <div
      className="mt-8 relative pl-6 md:pl-20"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="text-xl md:text-2xl font-bold capitalize my-2">{title}</h1>
      <div
        className={classNames(
          "absolute text-5xl top-[50%] z-40 -ml-16 cursor-pointer hidden md:block",
          { "md:hidden": !showControls }
        )}
      >
        <BsChevronCompactLeft
          onClick={() => {
            handleDirection("left");
          }}
        />
      </div>
      <div
        className={classNames(
          "absolute text-5xl right-0 top-[50%] z-50 mr-4 cursor-pointer hidden md:block",
          { "md:hidden": !showControls }
        )}
      >
        <BsChevronCompactRight
          onClick={() => {
            handleDirection("right");
          }}
        />
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll md:overflow-visible">
        {data.map((movie, index) => (
          <Card
            movie={movie}
            index={index}
            key={movie.id}
            listRef={
              !index ? listRef : index === data.length - 1 ? lastRef : null
            }
            last={index === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;

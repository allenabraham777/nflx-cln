import classNames from "classnames";
import { useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Card from "../Card/Card";

const CardSlider = ({ title, data }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const listRef = useRef();
  const lastRef = useRef();

  const handleDirection = (direction) => {
    const rightPosition =
      lastRef.current.getBoundingClientRect().x -
      document.body.clientWidth +
      240;
    const leftPosition = listRef.current.getBoundingClientRect().right;
    if (direction === "right" && rightPosition > 0) {
      listRef.current.style.marginLeft = `-${(sliderPosition + 1) * 240}px`;
      setSliderPosition(sliderPosition + 1);
      setShowLeft(true);
    }

    if (direction === "left") {
      if (leftPosition < 80) {
        listRef.current.style.marginLeft = `-${(sliderPosition - 1) * 240}px`;
        setSliderPosition(sliderPosition - 1);
      }
      if (sliderPosition - 1 < 1) {
        setShowLeft(false);
      }
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
          "absolute text-5xl bottom-0 z-40 -ml-20 px-6 cursor-pointer hidden bg-gradient-to-r from-zinc-900 to-transparent h-[129px] md:flex items-center",
          {
            "md:hidden": !showControls || !showLeft,
          }
        )}
        onClick={() => {
          handleDirection("left");
        }}
      >
        <BsChevronCompactLeft />
      </div>
      <div
        className={classNames(
          "absolute text-5xl right-0 bottom-0 z-50 cursor-pointer hidden md:flex h-[129px] bg-gradient-to-l from-zinc-900 to-transparent items-center px-6",
          { "md:hidden": !showControls }
        )}
        onClick={() => {
          handleDirection("right");
        }}
      >
        <BsChevronCompactRight />
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
